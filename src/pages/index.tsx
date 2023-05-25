import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { FormControl, FormLabel, Input, Select, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import SpaIcon from '@mui/icons-material/Spa';
import KingBedIcon from '@mui/icons-material/KingBed';
import axios from 'axios';

const API_URL = 'http://localhost:7000/sliders';

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [sliders, setSliders] = useState([]);

  interface Slider {
    ID_Slider: string,
    Image: string,
    Titre: string,
    Text: string,
    DateU: Date
  }
  
  const fetchData = async () => {
    const result = await axios(API_URL);
    setSliders(result.data);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % sliders.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [sliders]);

  const handleRadioChange = (index) => {
    setCurrentImage(index);
  };

  return (
    <>
      <Head>
        <title>Harbor Hotel</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <section className={styles.banner}>
          {sliders.map((slider: Slider, index) => (
            <div
              key={slider.ID_Slider}
              style={{
                height: '700px',
                backgroundImage: `url(/images/${slider.Image})`,
                display: index === currentImage ? 'block' : 'none',
              }}
            >
              <div className={styles.bannerContent}>
                <h2>{slider.Titre}</h2>
                <h1>{slider.Text}</h1>
              </div>
            </div>
          ))}
          <div className={styles.radioButtons}>
            {sliders.map((slider: Slider, index) => (
              <input
                key={slider.ID_Slider}
                type="radio"
                name="slider-radio"
                checked={currentImage === index}
                onChange={() => handleRadioChange(index)}
              />
            ))}
          </div>
        </section>				{/* ========================================================== */}
        <section
          style={{
            padding: '40px',
            backgroundColor: '#f9f9f9',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '0 20px',
              gap: '25px',
            }}
          >
            <FormControl fullWidth>
              <FormLabel htmlFor="checkin_date">Check-in Date</FormLabel>
              <Input
                id="checkin_date"
                type="date"
                placeholder="Check-in date"
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="checkout_date">Check-out Date</FormLabel>
              <Input
                id="checkout_date"
                type="date"
                placeholder="Check-out date"
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="room">Room</FormLabel>
              <Select native id="room">
                <option value="suite">Suite</option>
                <option value="family-room">Family Room</option>
                <option value="deluxe-room">Deluxe Room</option>
                <option value="classic-room">Classic Room</option>
                <option value="superior-room">Superior Room</option>
                <option value="luxury-room">Luxury Room</option>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="guests">Guests</FormLabel>
              <Select native id="guests">
                <option value="1">1 Adult</option>
                <option value="2">2 Adult</option>
                <option value="3">3 Adult</option>
                <option value="4">4 Adult</option>
                <option value="5">5 Adult</option>
                <option value="6">6 Adult</option>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                flex: '1 0 auto',
                fontSize: '16px',
                fontFamily: 'Nunito Sans, Arial, sans-serif',
                position: 'relative',
                letterSpacing: '4px',
                color: '#f5e4c3',
                textTransform: 'uppercase',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Check Availability
                </span>
                <span style={{ fontSize: '12px', marginLeft: '5px' }}>
                  Best Price Guaranteed!
                </span>
              </div>
            </Button>
          </div>
        </section>

				{/* ========================================================== */}
        		
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
              <Grid container spacing={2} style={{ justifyContent: 'center' }}>
                <Grid item xs={6} sm={4} md={2}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <NotificationsIcon color="primary" fontSize="large" style={{ marginBottom: '10px' }} />
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Friendly Service
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <LocalDiningIcon color="primary" fontSize="large" style={{ marginBottom: '10px' }} />
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Get Breakfast
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <AirportShuttleIcon color="primary" fontSize="large" style={{ marginBottom: '10px' }} />
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Transfer Services
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <SpaIcon color="primary" fontSize="large" style={{ marginBottom: '10px' }} />
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Suits & SPA
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Card>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <KingBedIcon color="primary" fontSize="large" style={{ marginBottom: '10px' }} />
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Cozy Rooms
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>

      </div>
    </>
  );
}