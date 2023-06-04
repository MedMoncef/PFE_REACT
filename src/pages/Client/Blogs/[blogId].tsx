import Head from 'next/head';
import { Typography, TextField, Button, Link, Box, Card, CardContent, CardMedia, Grid, CardActions } from '@mui/material';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const API_URL = 'http://localhost:7000/blogs';
export default function Blog() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Blog Details</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>

      <div>

        <div className={styles.about}>
          <h2>READ BLOG</h2>
          <h1>Recent Blog</h1>
        </div>

    
      </div>
    </>
  );
};