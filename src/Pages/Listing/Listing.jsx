import { useEffect, useRef, useState } from "react";


const Listing = () => {
    const loadMoreRef = useRef('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');

    const [allPokemon, setAllPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadMoreData = async () => {
        setIsLoading(true);

        try {

            const response = await fetch(loadMoreRef.current);
            const data = await response.json();
            loadMoreRef.current = data.next;
            // console.log('data', data);
            console.log('next', data.next);
            // console.log('loadMore', loadMore);
            const createPokemonObject = (result) => {
                result.forEach(async (pokemon) => {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`)
                    const data = await res.json()
                    setAllPokemon(currentList => [...currentList, data])
                })
            }
            createPokemonObject(data.results)

        } catch (error) {
            console.error('Error loading more data:', error);
        }
        setIsLoading(false);

    };

    // Load initial data
    useEffect(() => {
        loadMoreData();
    }, []);

    // Function to handle scroll event
    const handleScroll = () => {
        // Check if user has scrolled to the bottom of the page
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight &&
            !isLoading
        ) {
            loadMoreData(); // Load more data
        }
    };

    // Add scroll event listener when component mounts
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Remove event listener when component unmounts
    }, []);

    // Render your component JSX
    return (
        <div>
            <ul>
                {allPokemon.map((pokemon, index) => (

                    <img key={index} src={pokemon?.sprites?.other?.home?.front_default}></img>

                ))}
            </ul>
            <button onClick={() => loadMoreData()}>LoadMore</button>
        </div>
    );
}

export default Listing;
{/* <img key={item.name} src={data?.sprites?.other?.home?.front_default}></img> */ }