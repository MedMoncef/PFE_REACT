import Head from 'next/head';
import { Typography, TextField, Link, Card, CardContent, Grid, createTheme, ThemeProvider, CardMedia, Button, Container, Box, CssBaseline } from '@mui/material';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import { useClient } from '@/context/ClientContext';
import { z } from 'zod';

const contactSchema = z.object({
  nom: z.string().nonempty('Nom is required'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  sujet: z.string().nonempty('sujet is required'),
  message: z.string().nonempty('message is required'),
});

const stylesD = {
  card: {
    backgroundImage: `url(/images/Blog/image_6.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '2rem',
    color: 'white',
  },
};

export default function Home() {
  const { submitContactForm } = useClient();
  const router = useRouter();
  const [title, setTitle] = useState('Welcome, please register!');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [sujet, setSujet] = useState('');
  const [message, setMessage] = useState('');

  const resetForm = (event) => {
    event.preventDefault();
    setNom('');
    setEmail('');
    setSujet('');
    setMessage('');
  };

  const handleContact = (event) => {
    event.preventDefault();
    try {
      contactSchema.parse({
        nom,
        email,
        sujet,
        message,
      });
  
      submitContactForm(nom, email, sujet, message);
      // Optional: Show success message or redirect to a success page
    } catch (error) {
      console.log("error submit");
    }
  };

  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>

      <div>
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
              <h1>Contact Us</h1>
            </div>
          </div>
        </section>

        <div className={styles.about}>
          <h2>WELCOME TO HARBOR LIGHTS HOTEL</h2>
          <h1>Message us or call, we'll answer</h1>
        </div>

        {/* Contact Information */}
        <section>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '5%' }}>
                <div>
                    <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12837.362651451496!2d10.724349!3d36.4493228!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130299a2da4fe895%3A0x81375888b980e5d8!2sIMSET%20NABEUL!5e0!3m2!1sfr!2stn!4v1684870791988!5m2!1sfr!2stn"
                    width="500"
                    height="550"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div style={{ marginLeft: '5rem', background: 'white', padding: '50px', width: '35%' }}>
                    <form onSubmit={handleContact} >
                    <div style={{ marginBottom: '1rem' }}>
                        <TextField label="Nom" variant="outlined" fullWidth type="string"
                          value={nom}
                          onChange={(event) => setNom(event.target.value)}                                                
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <TextField label="Email" variant="outlined" fullWidth type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}                                                
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <TextField 
                          label="Sujet" 
                          variant="outlined" 
                          fullWidth
                          type="string"
                          value={sujet}
                          onChange={(event) => setSujet(event.target.value)}                                                
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <TextField label="Message" multiline rows={7} variant="outlined" fullWidth type="string"
                          value={message}
                          onChange={(event) => setMessage(event.target.value)}                        
                        />
                    </div>
                    <div>
                      <Button fullWidth variant="contained" color="primary" type="submit">
                        Envoyer
                      </Button>
                      <p>‎</p>
                      <Button fullWidth variant="outlined" onClick={resetForm}>
                        Reset
                      </Button>
                    </div>
                    </form>
                </div>
            </div>
            <div>
          </div>


        <Grid item xs={12} md={12} style={{ padding: '50px' }}>
          <Card style={stylesD.card}>
            <CardContent style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <Typography variant="h4" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> 123 Ocean Avenue, Waterfront City
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> +1 123 456 7890
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> info@harborhotel.com
              </Typography>
              <Typography variant="body1">
                <strong>Follow us:</strong>{' '}
                <Link href="#" color="secondary">
                  Facebook
                </Link>{' '}
                |{' '}
                <Link href="#" color="secondary">
                  Instagram
                </Link>{' '}
                |{' '}
                <Link href="#" color="secondary">
                  Twitter
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        </section>
      </div>
    </>
  );
}