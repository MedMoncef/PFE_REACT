import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { z } from 'zod';
import { Button, Grid, Input, TextField, Paper, Typography, FormLabel } from '@mui/material';
import { Link } from '@mui/material';
import styles from '@/styles/Home.module.css';
import { CldUploadWidget, CldUploadButton } from 'next-cloudinary';


const registerSchema = z.object({
  nom: z.string().nonempty('Nom is required'),
  prenom: z.string().nonempty('Prénom is required'),
  dateN: z.string().nonempty('Date of Birth is required'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
  confirmPassword: z.string().nonempty('Confirm Password is required'),
  id_post: z.string().nonempty('Post is required'),
});

export default function Register() {
  const { register, isLoggedIn } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('Welcome, please register!');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateN, setDateN] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');
  const [id_post, setPost] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result contains the base64 string
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = (event) => {
    event.preventDefault();
    setNom('');
    setPrenom('');
    setDateN('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPost('');
    setImage('');
    setErrors({ email: '', password: '' });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      registerSchema.parse({
        nom,
        prenom,
        dateN,
        email,
        password,
        confirmPassword,
        image,
        id_post,
      });
  
        // Update your register function to handle file upload (you'll need to modify this on your server side too)
        await register(nom, prenom, dateN, email, password, confirmPassword, image, id_post);
        // Optional: Show success message or redirect to a success page
      } catch (error) {
        if (error instanceof z.ZodError) {
          const emailError = error.issues.find((issue) => issue.path[0] === 'email');
          const passwordError = error.issues.find((issue) => issue.path[0] === 'password');
          setErrors({
            email: emailError ? emailError.message : '',
            password: passwordError ? passwordError.message : '',
          });
        }
      }
    };

  
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <Head>
        <title>Register page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <main>

      <section className={styles.banner} style={{ height: '600px' }}>
          <div
            style={{
              height: '600px',
              backgroundImage: `url(/images/bg_3.jpg)`,
              display: 'block',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            <div className={styles.bannerContent}>
              <h2><Link style={{ color: '#f5e4c3' }} href="/">Home</Link></h2>
              <h1>Register</h1>
            </div>
          </div>
        </section>

        <br></br>
        <Grid container justifyContent="center" alignItems="center" sx={{ mb: '5%' }}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={6} sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                {title}
              </Typography>
              <form onSubmit={handleRegister}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Nom"
                      name="nom"
                      type="text"
                      value={nom}
                      onChange={(event) => setNom(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Prénom"
                      name="prenom"
                      type="text"
                      value={prenom}
                      onChange={(event) => setPrenom(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel htmlFor="checkout_date">Birthday</FormLabel>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="dateN"
                      type="date"
                      value={dateN}
                      onChange={(event) => setDateN(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Email Address"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      error={!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      error={!errors.password}
                      helperText={errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Post"
                      name="id_post"
                      type="text"
                      value={id_post}
                      onChange={(event) => setPost(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      type="file"
                      onChange={handleImageChange}
                    />
                  </Grid>

                    

                  <Grid item xs={12}>
                    <Button fullWidth variant="contained" color="primary" type="submit">
                      Register
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth variant="outlined" onClick={resetForm}>
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth variant="outlined" onClick={() => router.push('/auth/login')}>
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </>
  );
}