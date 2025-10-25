const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('./models/User');
const LostItem = require('./models/LostItem');
const FoundItem = require('./models/FoundItem');
const Match = require('./models/Match');
const Message = require('./models/Message');
const Notification = require('./models/Notification');
const Location = require('./models/Location');

// Load environment variables
dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/findly')
  .then(() => {
    console.log('Connected to MongoDB');
    seedDatabase();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await LostItem.deleteMany({});
    await FoundItem.deleteMany({});
    await Match.deleteMany({});
    await Message.deleteMany({});
    await Notification.deleteMany({});
    await Location.deleteMany({});

    console.log('Cleared existing data');

    // Create users
    const password = await bcrypt.hash('password123', 10);
    
    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        password,
        isAdmin: false
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '555-987-6543',
        password,
        isAdmin: false
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        phone: '555-555-5555',
        password,
        isAdmin: true
      }
    ]);

    console.log('Created users:', users.map(user => user.email));

    const categories = ['Electronics', 'Jewelry', 'Wallets', 'Keys', 'Documents', 'Clothing', 'Bags', 'Other'];

    // Create lost items
    const lostItems = await LostItem.insertMany([
      {
        user_id: users[0]._id,
        item_name: 'iPhone 13',
        category: 'Electronics',
        description: 'Black iPhone 13 with clear case. Has a crack on the screen.',
        last_seen_location: 'Central Park, New York',
        lost_date: new Date('2023-04-15'),
        status: 'Lost',
        image_url: 'https://source.unsplash.com/400x300/?iphone'
      },
      {
        user_id: users[1]._id,
        item_name: 'Gold Necklace',
        category: 'Jewelry',
        description: 'Gold necklace with heart pendant. Sentimental value.',
        last_seen_location: 'Beach Boardwalk',
        lost_date: new Date('2023-04-20'),
        status: 'Lost',
        image_url: 'https://source.unsplash.com/400x300/?necklace'
      },
      {
        user_id: users[0]._id,
        item_name: 'Car Keys',
        category: 'Keys',
        description: 'Honda car keys with black fob and house key attached.',
        last_seen_location: 'Downtown Coffee Shop',
        lost_date: new Date('2023-05-01'),
        status: 'Lost',
        image_url: 'https://source.unsplash.com/400x300/?keys'
      }
    ]);

    console.log('Created lost items:', lostItems.map(item => item.item_name));

    // Create found items
    const foundItems = await FoundItem.insertMany([
      {
        user_id: users[1]._id,
        item_name: 'iPhone',
        category: 'Electronics',
        description: 'Found black iPhone with cracked screen and clear case.',
        found_location: 'Near Central Park entrance',
        found_date: new Date('2023-04-16'),
        status: 'Unclaimed',
        image_url: 'https://source.unsplash.com/400x300/?iphone'
      },
      {
        user_id: users[0]._id,
        item_name: 'Car Keys',
        category: 'Keys',
        description: 'Honda car keys found on coffee shop table.',
        found_location: 'Starbucks on Main Street',
        found_date: new Date('2023-05-02'),
        status: 'Unclaimed',
        image_url: 'https://source.unsplash.com/400x300/?carkeys'
      },
      {
        user_id: users[2]._id,
        item_name: 'Wallet',
        category: 'Wallets',
        description: 'Brown leather wallet with ID and credit cards.',
        found_location: 'City Library',
        found_date: new Date('2023-05-05'),
        status: 'Unclaimed',
        image_url: 'https://source.unsplash.com/400x300/?wallet'
      }
    ]);

    console.log('Created found items:', foundItems.map(item => item.item_name));

    // Create matches
    const matches = await Match.insertMany([
      {
        lost_item_id: lostItems[0]._id,
        found_item_id: foundItems[0]._id,
        confidence_score: 0.92,
        match_status: 'Pending'
      },
      {
        lost_item_id: lostItems[2]._id,
        found_item_id: foundItems[1]._id,
        confidence_score: 0.88,
        match_status: 'Confirmed'
      }
    ]);

    console.log('Created matches:', matches.length);

    // Create messages
    const messages = await Message.insertMany([
      {
        sender_id: users[1]._id,
        receiver_id: users[0]._id,
        content: 'Hi, I think I found your iPhone at Central Park. It has a cracked screen.'
      },
      {
        sender_id: users[0]._id,
        receiver_id: users[1]._id,
        content: 'Thank you so much! That sounds like my phone. When can we meet?'
      },
      {
        sender_id: users[0]._id,
        receiver_id: users[2]._id,
        content: 'Hi, have you found a brown wallet recently?'
      }
    ]);

    console.log('Created messages:', messages.length);

    // Create notifications
    const notifications = await Notification.insertMany([
      {
        user_id: users[0]._id,
        message: 'We found a potential match for your lost iPhone!',
        type: 'Match Found',
        resource_id: matches[0]._id,
        resource_model: 'Match'
      },
      {
        user_id: users[0]._id,
        message: 'Jane Smith sent you a message',
        type: 'Message',
        resource_id: messages[0]._id,
        resource_model: 'Message'
      },
      {
        user_id: users[1]._id,
        message: 'John Doe replied to your message',
        type: 'Message',
        resource_id: messages[1]._id,
        resource_model: 'Message'
      }
    ]);

    console.log('Created notifications:', notifications.length);

    // Create locations
    const locations = await Location.insertMany([
      {
        item_id: lostItems[0]._id,
        item_type: 'LostItem',
        latitude: 40.7812,
        longitude: -73.9665,
        user_id: users[0]._id
      },
      {
        item_id: foundItems[0]._id,
        item_type: 'FoundItem',
        latitude: 40.7690,
        longitude: -73.9650,
        user_id: users[1]._id
      },
      {
        item_id: lostItems[2]._id,
        item_type: 'LostItem',
        latitude: 40.7580,
        longitude: -73.9855,
        user_id: users[0]._id
      }
    ]);

    console.log('Created locations:', locations.length);

    console.log('Database seeded successfully!');
    console.log('Sample user login credentials:');
    console.log('Email: john@example.com, Password: password123');
    console.log('Email: jane@example.com, Password: password123');
    console.log('Email: admin@example.com, Password: password123');
    
    console.log('Remember to restart your server to see the changes');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}; 