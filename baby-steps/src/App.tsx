function getName(): string {
  const younger = Math.floor(Math.random() * 100);
  let name: string;

  if (younger % 2 == 0) {
    name = 'Devere';
  } else {
    name = 'Paris';
  }

  return name;
}

const welcome = {
  greeting: 'Hey',
  title: 'React',
}

export default function App() {
  
  return (
    <div>
      <h1>{welcome.greeting}, {getName()}, welcome to {welcome.title}!</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  );
}