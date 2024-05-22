import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

export default function CountryList({ cities = [], isLoading }) 
{
  if (isLoading) return <Spinner />;
  if(!cities.length) return <Message message="Add your first country by clicking the"/>

  const countries = cities.reduce((array, city) => 
    {
    if (!array.map(element => element.country).includes(city.country)) 
    {
      return [...array, { country: city.country, emoji: city.emoji }];
    } 
    else 
    {
      return array;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map(country => <CountryItem country={country}/>)}
    </ul>
  );
}