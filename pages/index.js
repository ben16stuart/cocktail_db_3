import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import DrinkCard from '../components/DrinkCard';

export default function Home() {
  const [drink, setDrink] = useState(null);

  useEffect(() => {
    fetch('/api/supabase')
      .then((res) => res.json())
      .then((data) => setDrink(data));
  }, []);

  return (
    <div>
      <Header />
      <SearchBar />
      {drink && <DrinkCard drink={drink} />}
    </div>
  );
}
