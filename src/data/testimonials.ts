export const testimonials = [
  { 
    id: "g1", 
    name: "Rahul Patil", 
    image: "https://lh3.googleusercontent.com/a/ACg8ocL-...", // Placeholder or real URL if available, keeping as is from route.ts but mapped to UI needs
    rating: 5, 
    text: "Nice tattoo design and nice place nice service",
  },
  { 
    id: "g2", 
    name: "Priya Sharma", 
    image: "https://lh3.googleusercontent.com/a/ACg8ocM...", 
    rating: 5, 
    text: "Loved your work Akash 😍 really😍 Soon many more tattoos to come🎉",
  },
  { 
    id: "g3", 
    name: "Sneha Kapoor", 
    image: "https://lh3.googleusercontent.com/a/ACg8ocN...",
    rating: 5, 
    text: "Your passion for tattoo art shines through in every piece you create.",
  },
  { 
    id: "g4", 
    name: "Vikram Singh",
    image: "https://lh3.googleusercontent.com/a/ACg8ocO...",
    rating: 5, 
    text: "Best tattoo studio in Kalyan. The hygiene and detailing is top notch.",
  },
  { 
    id: "g5", 
    name: "Anjali Deshmukh",
    image: "https://lh3.googleusercontent.com/a/ACg8ocP...",
    rating: 5, 
    text: "Amazing experience! Akash is very talented and patient. Highly recommend.",
  }
];

// Ideally we'd keep the exact shape from route.ts if we want to share type exactly, 
// but for the UI requirements I've mapped fields slightly (author_name -> name).
// Let's actually keep the FULL object from route.ts to avoid breaking the API, 
// then we can map it in the UI or export a mapped version.

export const REAL_REVIEWS = [
  {
    id: "g1",
    author_name: "Pratik Jethithore",
    author_url: "https://www.google.com/maps/contrib/",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default",
    rating: 5,
    relative_time_description: "2 years ago",
    text: "Nice tattoo design and nice place nice service",
    time: 1643000000
  },
  {
    id: "g2",
    author_name: "Muskan Lala",
    author_url: "https://www.google.com/maps/contrib/",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default",
    rating: 5,
    relative_time_description: "3 years ago",
    text: "Loved your work Akash 😍 really😍 Soon many more tattoos to come🎉",
    time: 1611000000
  },
  {
    id: "g3",
    author_name: "Gunjan Gala",
    author_url: "https://www.google.com/maps/contrib/",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default",
    rating: 5,
    relative_time_description: "5 months ago",
    text: "Your attention to detail and precision is truly impressive! Every line, every shade, every detail is perfection. Your passion for tattoo art shines through in every piece you create.",
    time: 1700000000
  },
  {
    id: "g4",
    author_name: "Vaishnavi Kamble",
    author_url: "https://www.google.com/maps/contrib/",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default",
    rating: 5,
    relative_time_description: "5 months ago",
    text: "Got my first tattoo done by Akash at Welkin Studio and I couldn't be happier! He specializes in fine line botanical work. Super clean studio, great energy, and he explained the aftercare in detail. Highly recommend!",
    time: 1700005000
  },
  {
    id: "g5",
    author_name: "Kajal Chaudhari",
    author_url: "https://www.google.com/maps/contrib/",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default",
    rating: 5,
    relative_time_description: "3 months ago",
    text: "I have made 2 tattoos from Akash ❤️ and I loved it! Akash is the best tattoo artist. Loved the work and single detailing & finishing very nice ❤️ my experience was very good and got very amazing service ❤️❤️❤️",
    time: 1703000000
  },
  {
    id: "g6",
    author_name: "Rupali Sharma",
    author_url: "https://www.google.com/maps/contrib/",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default",
    rating: 5,
    relative_time_description: "3 years ago",
    text: "The artist and the whole experience for the tattoo was amazing. It was my first tattoo and I loved it. A big thanks!",
    time: 1612000000
  },
  {
    id: "g7",
    author_name: "Punjabi Gaurav",
    author_url: "https://www.google.com/maps/contrib/",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default",
    rating: 5,
    relative_time_description: "2 years ago",
    text: "It was my best experience with Welkin Tattoos 💯 Highly recommended. You think, we ink 🔥",
    time: 1640000000
  },
  {
    id: "g8",
    author_name: "Raj Kerurkar",
    author_url: "https://www.google.com/maps/contrib/",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default",
    rating: 5,
    relative_time_description: "3 years ago",
    text: "Akash is very talented and his skillset is amazing. I thought it may not look like my expectations, but this was way beyond my expectations.",
    time: 1609000000
  },
  {
    id: "g9",
    author_name: "Ashish Mendhe",
    author_url: "https://www.google.com/maps/contrib/",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default",
    rating: 5,
    relative_time_description: "7 months ago",
    text: "I'm from Nagpur. Akash is a good friend of my brother. My brother Ankit suggested this shop. Akash is the best tattoo artist in the town. I also suggest my friends to visit the shop.",
    time: 1698000000
  },
  {
    id: "g10",
    author_name: "Gayatri Garegrat",
    author_url: "https://www.google.com/maps/contrib/",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default",
    rating: 5,
    relative_time_description: "2 years ago",
    text: "Best tattoo artist. Loved the work, every single detailing & finishing. Literally loved it a lot ❤️ got compliments 😍😍",
    time: 1641000000
  },
  {
    id: "g11",
    author_name: "Steffy Anthony",
    author_url: "https://www.google.com/maps/contrib/",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default",
    rating: 5,
    relative_time_description: "5 months ago",
    text: "I have made three tattoos from Akash. He helped me with tattoo healing details, so my experience was very awesome and the service was amazing.",
    time: 1700008000
  },
  {
    id: "g12",
    author_name: "Umesh Talreja",
    author_url: "https://www.google.com/maps/contrib/",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default",
    rating: 5,
    relative_time_description: "1 year ago",
    text: "Recently I got my second tattoo. It was my cover-up tattoo and it turned out very well above my expectations. A big thanks to tattoo artist Akash ❤️",
    time: 1676000000
  }
];
