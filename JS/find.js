const profiles = [
  {
    name: 'Bongani', age: 36, occupation: 'Chef', location: 'Durban',
    image: 'images/People/Bongani.jpg',
    bio: 'Food is my love language. I live for bold flavours, loud music, and deep laughs.',
    interests: ['Cooking', 'Dancing', 'Afrobeat', 'Family gatherings'],
    lookingFor: 'Someone who loves laughter, food, and deep conversations around the fire.'
  },
  {
    name: 'Bradley', age: 26, occupation: 'Personal Trainer', location: 'Cape Town',
    image: 'images/People/Bradley.jpg',
    bio: 'I live for movement — whether it\'s in the gym, on a surfboard, or dancing at a festival.',
    interests: ['Gym', 'Surfing', 'Music festivals', 'Healthy food'],
    lookingFor: 'An active, outgoing partner who enjoys fitness and fun.'
  },
  {
    name: 'Jason', age: 31, occupation: 'Software Developer', location: 'Pretoria',
    image: 'images/People/Jason.jpg',
    bio: 'Introvert at heart but full of surprises. Coding, gaming, and coffee shop vibes are my jam.',
    interests: ['Coding', 'Anime', 'Sci-fi', 'Board games', 'Coffee'],
    lookingFor: 'Someone kind, creative, and open to long chats and cozy nights in.'
  },
  {
    name: 'Jimmy', age: 32, occupation: 'Logistics Coordinator', location: 'Johannesburg',
    image: 'images/People/Jimmy.webp',
    bio: 'Reliable and driven. I enjoy braais, football, and the open road.',
    interests: ['Football', 'Braais', 'Road trips', 'Classic R&B'],
    lookingFor: 'A down-to-earth woman who enjoys the simple things.'
  },
  {
    name: 'Lucky', age: 33, occupation: 'Entrepreneur', location: 'Johannesburg',
    image: 'images/People/Lucky.jpg',
    bio: 'Business-minded with a soft spot for family and good food.',
    interests: ['Networking', 'Cooking', 'Music', 'Mentorship'],
    lookingFor: 'An ambitious woman who supports dreams and values family.'
  },
  {
    name: 'Michael', age: 34, occupation: 'Financial Analyst', location: 'Johannesburg',
    image: 'images/People/Michael.jpg',
    bio: 'Driven and dependable. I love wine, bush getaways, and meaningful conversations.',
    interests: ['Hiking', 'Wine tasting', 'Reading', 'Bush getaways'],
    lookingFor: 'Someone emotionally intelligent who loves the outdoors.'
  },
  {
    name: 'Neo', age: 27, occupation: 'Graphic Designer', location: 'Cape Town',
    image: 'images/People/Neo.jpg',
    bio: 'Laid-back and creative. I live for sunsets and sketchbooks.',
    interests: ['Sketching', 'Lo-fi music', 'Thrift shopping', 'Street photography'],
    lookingFor: 'A gentle soul who values creativity, calm, and connection.'
  },
  {
    name: 'Siphesihle', age: 29, occupation: 'DJ & Music Producer', location: 'Pretoria',
    image: 'images/People/Siphesihle.jpg',
    bio: 'Music is everything. Let’s dance through life together.',
    interests: ['Producing beats', 'House music', 'Clubbing', 'Vinyl collecting'],
    lookingFor: 'Someone who vibes with music, nightlife, and spontaneous fun.'
  },
  {
    name: 'Themba', age: 28, occupation: 'Civil Engineer', location: 'Pretoria',
    image: 'images/People/Themba.jpg',
    bio: 'A jazz lover who builds both structures and relationships.',
    interests: ['Jazz', 'Traveling', 'Coffee tasting', 'Architecture'],
    lookingFor: 'A thoughtful partner who enjoys music and meaningful experiences.'
  },
  {
    name: 'Zuko', age: 31, occupation: 'Videographer', location: 'East London',
    image: 'images/People/Zuko.jpg',
    bio: 'Telling stories with a camera and chasing new places.',
    interests: ['Videography', 'Adventure travel', 'YouTube', 'Photography'],
    lookingFor: 'A creative adventurer who lives in the moment.'
  }
];


const container = document.getElementById('cardContainer');
const aside = document.getElementById('profileDetails');

// Reverse to show newest profiles on top
profiles.reverse().forEach(profile => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${profile.image}" alt="${profile.name}" style="width:75%; height:70%" />
    <h3>${profile.name}, ${profile.age}</h3>
    <button class="info-button" onclick='showDetails(${JSON.stringify(profile)})'>More Info</button>
  `;
  container.appendChild(card);
  addSwipe(card);
});

function addSwipe(card) {
  let offsetX = 0;
  let isDragging = false;
  let startX;

  const onMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX || e.touches[0].clientX;
    offsetX = x - startX;
    card.style.transform = `translateX(${offsetX}px) rotate(${offsetX * 0.05}deg)`;
  };

  const onEnd = () => {
    isDragging = false;
    if (offsetX > 150 || offsetX < -150) {
      card.style.transform = `translateX(${offsetX > 0 ? 1000 : -1000}px)`;
      setTimeout(() => card.remove(), 300);
    } else {
      card.style.transform = 'translateX(0)';
    }
  };

  card.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMove);
      onEnd();
    }, { once: true });
  });

  card.addEventListener('touchstart', e => {
    isDragging = true;
    startX = e.touches[0].clientX;
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', () => {
      document.removeEventListener('touchmove', onMove);
      onEnd();
    }, { once: true });
  });
}

function swipe(direction) {
  const topCard = container.lastElementChild;
  if (!topCard) return;

  topCard.style.transform = direction === 'right' ? 'translateX(1000px)' : 'translateX(-1000px)';
  setTimeout(() => topCard.remove(), 300);
}

function showDetails(profile) {
  aside.innerHTML = `
    <h2>${profile.name}, ${profile.age}</h2>
    <img src="${profile.image}" style="width: 100%; border-radius: 10px; margin-bottom: 10px;" />
    <p><strong>Occupation:</strong> ${profile.occupation}</p>
    <p><strong>Location:</strong> ${profile.location}</p>
    <p><strong>About:</strong> ${profile.bio}</p>
    <p><strong>Interests:</strong> ${profile.interests.join(', ')}</p>
    <p><strong>Looking for:</strong> ${profile.lookingFor}</p>
    <button class="info-button" onclick="aside.classList.remove('active'); aside.style.display = 'none';">Close</button>
  `;

  setTimeout(() => {
    aside.style.display = "block";
  }, 100);

  setTimeout(() => {
    aside.classList.add('active');
  }, 200);
}

// Keep track of right swipes (matches)
const matches = [];

function swipe(direction) {
  const topCard = container.lastElementChild;
  if (!topCard) return;

  const profileName = topCard.querySelector('h3').textContent.split(',')[0];
  const profile = profiles.find(p => p.name === profileName);

  if (direction === 'right') {
    matches.push(profile);
  }

  topCard.style.transform = direction === 'right' ? 'translateX(1000px)' : 'translateX(-1000px)';
  setTimeout(() => topCard.remove(), 300);
}

// Show matches in a section
function showMatches() {
  const matchSection = document.getElementById('matches');
  matchSection.innerHTML = '<h2 style="color:white;">Your Matches</h2>';

  if (matches.length === 0) {
    matchSection.innerHTML += '<p>No matches yet. Swipe right on someone you like!</p>';
    return;
  }

  matches.forEach(match => {
    const div = document.createElement('div');
    div.className = 'match-card';
    div.innerHTML = `
      <img src="${match.image}" style="width: 60px; border-radius: 50%; margin-right: 10px;" />
      <strong>${match.name}, ${match.age}</strong><br>
      <button onclick="startChat('${match.name}')">Message</button>
    `;
    matchSection.appendChild(div);
  });
}

function startChat(name) {
  alert(`Starting chat with ${name}... (Chat feature coming soon!)`);
}


// message

let currentChatUser = '';

function startChat(name) {
  currentChatUser = name;
  document.getElementById('chatWith').textContent = `Chat with ${name}`;
  document.getElementById('chatMessages').innerHTML = ''; // Clear old chat
  document.getElementById('chatModal').style.display = 'flex';
}

function closeChat() {
  document.getElementById('chatModal').style.display = 'none';
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.textContent = `You: ${message}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom

  input.value = '';
}


