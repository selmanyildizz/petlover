// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.json());

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB'ye bağlandı");
}).catch((error) => {
  console.log("MongoDB bağlantı hatası:", error);
});

// Kullanıcı Şeması ve Modeli
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model('User', userSchema);

// Kayıt Endpoint'i
app.post('/api/login', async (req, res) => {
  const { email, username } = req.body;

  // Basit doğrulama
  if (!email || !username) {
    return res.status(400).json({ message: 'Email ve kullanıcı adı gereklidir.' });
  }

  try {
    // Yeni kullanıcı oluştur
    const newUser = new User({ email, username });
    await newUser.save();

    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.' });
  } catch (error) {
    // Hata durumunda
    if (error.code === 11000) {  // Unique constraint hatası
      res.status(400).json({ message: 'Email veya kullanıcı adı zaten kullanımda.' });
    } else {
      res.status(500).json({ message: 'Sunucu hatası' });
    }
  }
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
