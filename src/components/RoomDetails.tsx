import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import 'tailwindcss/tailwind.css';
import { useClient } from '@/context/ClientContext';
import { CldImage } from 'next-cloudinary';

const API_URL = 'http://localhost:7000';
const ROOMS_ENDPOINT = '/rooms';

function RoomsContent() {
const router = useRouter();
const { roomId } = router.query;
const [room, setRoom] = useState(null);
const [ID_Rooms, setIdRooms] = useState('');
const { setDayPrice } = useClient();

useEffect(() => {
    if (roomId) {
      axios.get(`${API_URL}${ROOMS_ENDPOINT}/${roomId}`).then((res) => {
        setRoom(res.data);
        setIdRooms(Array.isArray(roomId) ? roomId.join(", ") : roomId);
        if (res.data && res.data.Price) {
          setDayPrice(res.data.Price);
        }
      });
    }
   }, [roomId, setDayPrice]);
 
  return (
    <>
    <Grid container spacing={0} className="bg-blue-50" sx={{ maxWidth: 2000, margin: '2% auto' }}>
        <Grid item xs={12} md={6}>
        <Card>
            {room && (
            <CldImage width="750" height="450" src={`/Rooms/${room.Image}`} alt={room.Image}/>
            )}
        </Card>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                {room && (
                <>
                    <div>
                    <Typography gutterBottom variant="h5" component="div" className="text-blue-700" sx={{ marginBottom: '1rem' }}>
                        {room.Name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '1.5rem' }}>
                        {room.Description}
                    </Typography>
                    </div>

                    <div>
                    <Typography variant="body1" color="text.primary" sx={{ marginBottom: '2rem' }}>
                        <strong>Max:</strong> {room.Max} people
                    </Typography>

                    <Typography variant="body1" color="text.primary" sx={{ marginBottom: '2rem' }}>
                        <strong>Size:</strong> {room.Size} sqm
                    </Typography>

                    <Typography variant="body1" color="text.primary" sx={{ marginBottom: '2rem' }}>
                        <strong>Bed Number:</strong> {room.Bed_Number}
                    </Typography>

                    <Typography variant="body1" color="text.primary" sx={{ marginBottom: '2rem' }}>
                        <strong>Price:</strong> ${room.Price} per night
                    </Typography>

                    <Typography variant="body1" color="text.primary" sx={{ marginBottom: '2rem' }}>
                        <strong>View:</strong> {room.View}
                    </Typography>
                    </div>
                </>
                )}
            </CardContent>
            </Card>
        </Grid>
    </Grid>
    </>
    );
}

export default RoomsContent;