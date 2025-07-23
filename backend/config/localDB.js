const fs = require('fs');
const path = require('path');

class LocalDB {
  constructor() {
    this.dataDir = path.join(__dirname, '../data');
    this.ensureDataDirectory();
  }

  ensureDataDirectory() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  getFilePath(collection) {
    return path.join(this.dataDir, `${collection}.json`);
  }

  readCollection(collection) {
    try {
      const filePath = this.getFilePath(collection);
      if (!fs.existsSync(filePath)) {
        return [];
      }
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${collection}:`, error);
      return [];
    }
  }

  writeCollection(collection, data) {
    try {
      const filePath = this.getFilePath(collection);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error(`Error writing ${collection}:`, error);
      return false;
    }
  }

  generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // CRUD Operations
  create(collection, item) {
    const items = this.readCollection(collection);
    const newItem = {
      _id: this.generateId(),
      ...item,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.push(newItem);
    this.writeCollection(collection, items);
    return newItem;
  }

  findAll(collection, filter = {}) {
    const items = this.readCollection(collection);
    if (Object.keys(filter).length === 0) {
      return items;
    }
    
    return items.filter(item => {
      return Object.keys(filter).every(key => {
        if (typeof filter[key] === 'object' && filter[key].$regex) {
          const regex = new RegExp(filter[key].$regex, filter[key].$options || '');
          return regex.test(item[key]);
        }
        return item[key] === filter[key];
      });
    });
  }

  findById(collection, id) {
    const items = this.readCollection(collection);
    return items.find(item => item._id === id);
  }

  updateById(collection, id, updates) {
    const items = this.readCollection(collection);
    const index = items.findIndex(item => item._id === id);
    
    if (index === -1) {
      return null;
    }

    items[index] = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.writeCollection(collection, items);
    return items[index];
  }

  deleteById(collection, id) {
    const items = this.readCollection(collection);
    const index = items.findIndex(item => item._id === id);
    
    if (index === -1) {
      return null;
    }

    const deletedItem = items.splice(index, 1)[0];
    this.writeCollection(collection, items);
    return deletedItem;
  }

  count(collection, filter = {}) {
    const items = this.findAll(collection, filter);
    return items.length;
  }
}

module.exports = new LocalDB();