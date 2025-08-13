import Image from "next/image";
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to login page when accessing the root URL
  redirect('/login');
  
  // This part won't be executed because of the redirect
  return null;
}
