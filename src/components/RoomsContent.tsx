import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Link, Card, CardContent, Grid, createTheme, ThemeProvider, CardMedia, Button, Container, Box, CssBaseline, CardActions, FormControl, FormLabel, Input, Select } from '@mui/material';
import styles from '@/styles/Home.module.css';
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/router';

const API_URL = 'http://localhost:7000/rooms';
const API_URL1 = 'http://localhost:7000/roomTypes';
const ITEMS_PER_PAGE = 6;
function RoomsContent() {

  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [selectedView, setSelectedView] = useState('');

  const router = useRouter();

  interface Room {
    _id: String;
    ID_Rooms: string;
    Room_Number: string;
    Floor_Number: string;
    Name: string;
    Image: string;
    Description: string;
    Max: number;
    View: string;
    Size: string;
    Bed_Number: string;
    Type: string;
    Rating: number;
    Price: number;
  }

  interface RoomType {
    ID_RoomType: string;
    Name: string;
  }

  const fetchData = async () => {
    const result = await axios(API_URL);
    const result1 = await axios(API_URL1);
    setRooms(result.data);
    setRoomTypes(result1.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterRooms();
  }, [rooms, searchValue, selectedPrice, selectedRoomType, selectedView]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleRoomTypeChange = (event) => {
    setSelectedRoomType(event.target.value);
  };


  const filterRooms = () => {
    let filtered = rooms;

    // Filter by search value
    if (searchValue) {
      filtered = filtered.filter((room: Room) =>
        room.Name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Filter by price
    if (selectedPrice === 'lowest') {
      filtered = filtered.sort((a: Room, b: Room) => a.Price - b.Price);
    } else if (selectedPrice === 'highest') {
      filtered = filtered.sort((a: Room, b: Room) => b.Price - a.Price);
    }

    // Filter by room type
    if (selectedRoomType) {
      filtered = filtered.filter((room: Room) => room.Type === selectedRoomType);
    }

    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    setFilteredRooms(filtered);
    setCurrentPage(1);
  };

  const getDisplayedRooms = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredRooms.slice(startIndex, endIndex);
  };


  return (
    <>
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
              <h1>Rooms</h1>
            </div>
          </div>
        </section>

        <div className={styles.about}>
          <h2>HARBOR LIGHT'S ROOMS</h2>
        </div>

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
            margin: '0 5%',
            gap: '25px',
          }}
        >
          <FormControl fullWidth>
            <FormLabel htmlFor="search">Recherche</FormLabel>
            <Input
              id="search"
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="price">Prix</FormLabel>
            <Select
              native
              id="price"
              value={selectedPrice}
              onChange={handlePriceChange}
            >
              <option value="">...</option>
              <option value="highest">Le moins cher</option>
              <option value="lowest">Le plus cher</option>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="room">Type de Chambres</FormLabel>
            <Select
              native
              id="room"
              value={selectedRoomType}
              onChange={handleRoomTypeChange}
            >
              <option value="">Any</option>
              {roomTypes.map((roomType: RoomType) => (
                <option key={roomType.ID_RoomType} value={roomType.Name}>
                  {roomType.Name}
                </option>
              ))}
            </Select>
          </FormControl>

        </div>
      </section>


      <Grid container spacing={2} style={{ margin: '2% 0', display: 'flex', justifyContent: 'center' }}>
          {getDisplayedRooms().map((room: Room, index) => (
            <Card sx={{ maxWidth: 350, margin: '2% 2%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} key={room.ID_Rooms}>
              <CardMedia
                sx={{ height: 250 }}
                image={`/images/Rooms/${room.Image}`}
                title="Room image"
              />
              <CardContent>
                <div className={styles.rooms}>
                  <h1>{room.Name}</h1>
                  <h2>{room.Price}$ per night</h2>
                </div>
                <Typography variant="body2" color="text.secondary">
                  {room.Description}
                </Typography>
              </CardContent>
              <CardActions style={{ marginTop: 'auto' }}>
                <Button size="small" onClick={() => router.push(`/Client/Room/${room._id}`)}>Reserver</Button>
              </CardActions>
            </Card>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" marginBottom={5}>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
        </Box>

      </div>
    </>
    );
}

export default RoomsContent;