const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth'); // Sesuai dengan file auth.js kamu
const { User } = require('../models');

// PUT /api/profile
router.put('/', protect, async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      birthDate,
      gender,
      occupation,
      password
    } = req.body;

    // req.user sudah diisi oleh middleware protect
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    user.fullName = fullName ?? user.fullName;
    user.email = email ?? user.email;
    user.phoneNumber = phone ?? user.phoneNumber;
    user.address = address ?? user.address;
    user.birthDate = birthDate ?? user.birthDate;
    user.gender = gender ?? user.gender;
    user.occupation = occupation ?? user.occupation;

    if (password) {
      user.password = password; // akan otomatis di-hash di hook `beforeUpdate`
    }

    await user.save();

    return res.status(200).json({ message: 'Profil berhasil diperbarui' });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ message: 'Gagal memperbarui profil' });
  }
});

module.exports = router;
