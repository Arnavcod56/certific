const express = require('express');
const Certificate = require('../models/Certificate');
const router = express.Router();

// Add a certificate
router.post('/add', async (req, res) => {
  const { studentName, certificateID, issuedDate, issuer } = req.body;

  try {
    const newCertificate = new Certificate({
      studentName,
      certificateID,
      issuedDate,
      issuer
    });

    await newCertificate.save();
    res.status(201).json({ message: 'Certificate added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding certificate', error });
  }
});

// Verify certificate by ID
router.get('/verify/:certificateID', async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      certificateID: req.params.certificateID
    });

    if (certificate) {
      res.json({ message: 'Certificate verified', certificate });
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error verifying certificate', error });
  }
});

module.exports = router;
