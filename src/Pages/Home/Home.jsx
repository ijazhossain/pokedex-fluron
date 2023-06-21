import { useRef, useState } from "react";

const Home = () => {
    const [pokemon, setPokemon] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
const nameRef = useRef('')
    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }
    
    const handleSearchBtn = () => {
        fetchData()
    }
   
    const fetchData = async () => {
        if(nameRef.current.value=== ''){
            alert('Please enter a pokemon name')
            setPokemon({})
            return;
        }
        try {
            setLoading(true)
            setError('')
            // console.log(pokemonName);
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameRef.current.value}`)
            const data = await res.json()
            // console.log(data);
            setPokemon(data)
            setLoading(false)
        } catch {
            setError('No pokemon found with this name')
            setLoading(false)
            setPokemon({})
            return;
        }
    }

    return (
        <div className="home-container">
            <div className="text-center">
                <input ref={nameRef} type="text" placeholder="Type here" className="input  w-full max-w-xs border border-gray-300" />

                <button onClick={handleSearchBtn} className="ml-4 btn btn-xs sm:btn-sm md:btn-md ">Search</button>
            </div>
            <p className="text-red-500 mt-5">{error}</p>
            <div >
                <img className="mx-auto" src={pokemon?.sprites?.other?.home?.front_default} alt="" />
            </div>

        </div>
    );
};

export default Home;