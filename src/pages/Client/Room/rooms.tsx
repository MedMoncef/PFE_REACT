import Head from 'next/head';
import RoomsContent from '@/components/RoomsContent';

export default function Blog() {

  return (
    <>
      <Head>
        <title>Rooms</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>

      <RoomsContent />

    </>
  );
};