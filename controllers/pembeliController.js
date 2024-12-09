const Pembeli = require('../models/pembeli');
const Toko = require('../models/toko');  // Tambahkan model Toko
const bcrypt = require('bcryptjs');  // Untuk password hashing

// Fungsi untuk registrasi
const register = async (req, res) => {
    const { id_firebase, nama_lengkap, no_ponsel, email, kata_sandi, detail_alamat, id_kecamatan, id_kode_pos } = req.body;

    // Validasi input
    if (!id_firebase || !nama_lengkap || !no_ponsel || !email || !kata_sandi || !detail_alamat || !id_kecamatan || !id_kode_pos) {
        console.error("Field tidak lengkap:", req.body);
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    try {
        // Mengecek apakah email sudah terdaftar
        const existingUser = await Pembeli.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        // Hashing password
        const hashedPassword = await bcrypt.hash(kata_sandi, 10);

        // Simpan data pengguna baru
        const newUser = await Pembeli.create({
            id_firebase: id_firebase,
            nama_lengkap: nama_lengkap,
            no_ponsel: no_ponsel,
            email: email,
            kata_sandi: hashedPassword,
        });

        // Simpan data alamat pengguna
        const newAddress = {
            id_pembeli: newUser.id_pembeli,  // ID pembeli yang baru dibuat
            detail_alamat: detail_alamat,
            id_kecamatan: id_kecamatan,
            id_kode_pos: id_kode_pos,
            alamat_utama: true,
            nomor_ponsel_alamat: no_ponsel,
        };

        await Alamat.create(newAddress);

        // Respon sukses
        res.status(201).json({ message: 'Pendaftaran berhasil' });
    } catch (error) {
        console.error("Error selama proses registrasi:", error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

// Fungsi untuk login
// Fungsi untuk login
const login = async (req, res) => {
    const { no_ponsel, kata_sandi } = req.body;

    // Validasi input
    if (!no_ponsel || !kata_sandi) {
        return res.status(400).json({ message: 'Nomor telepon dan kata sandi wajib diisi' });
    }

    try {
        // Cek apakah nomor ponsel milik toko
        const toko = await Toko.findByNoPonsel(no_ponsel);
        if (toko) {
            // Verifikasi kata sandi untuk toko
            const isMatch = await bcrypt.compare(kata_sandi, toko.kata_sandi);
            if (!isMatch) {
                return res.status(400).json({ message: 'Kata sandi salah' });
            }
            // Jika login berhasil sebagai toko
            return res.status(200).json({
                message: 'Login berhasil',
                userType: 'toko',
                toko: toko
            });
        }

        // Jika bukan toko, cek apakah nomor ponsel milik pembeli
        const pembeli = await Pembeli.findByNoPonsel(no_ponsel);
        if (!pembeli) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        // Verifikasi kata sandi untuk pembeli
        const isMatch = await bcrypt.compare(kata_sandi, pembeli.kata_sandi);
        if (!isMatch) {
            return res.status(400).json({ message: 'Kata sandi salah' });
        }

        // Jika login berhasil sebagai pembeli
        res.status(200).json({
            message: 'Login berhasil',
            userType: 'user',
            pembeli: pembeli
        });
    } catch (error) {
        console.error('Error selama login:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { register, login };
