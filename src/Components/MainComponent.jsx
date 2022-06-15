import React, {useState,useEffect} from 'react';
import axios, { Axios } from 'axios';

const MainComponent = () => {

    const [Pokemon, setPokemon] = useState([]);
    const [WantedPokemon, setWantedPokemon] = useState('');
    const [MyPokemon, setMyPokemon] = useState('');
    const [showAllPoke, setshowAllPoke] = useState(false);
    const [showedPokemon, setShowedPokemon] = useState('');



    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').then(respuesta=>{
            setPokemon(respuesta.data.results)
        })
        }, []);

    const handleChange=(e)=>{
        setWantedPokemon(e.target.value)
    }
    const searchAPokemon =(e)=>{
        e.preventDefault()
        setMyPokemon(WantedPokemon)
        Pokemon.map((item)=>{
            const filtro = Object.values(item);
            const puedeSerPa = new Promise((resolve, reject) => {
                if(filtro[0] === MyPokemon.toLowerCase()){
                    resolve('lo encontre')
                }else{
                    reject('NO LO ENCONTRE')
                }
            })
            puedeSerPa
                .then(res=>setShowedPokemon(filtro[0])).then(console.log(showedPokemon))
                .catch(res => console.log(res))
        })
    }
    const showAll = () => {
        setshowAllPoke(!showAllPoke)
    }


    return (
        <div>
            <form onSubmit={searchAPokemon}>
                <input type="text" name="input" onChange={handleChange}/>
                <input type="submit" value="Buscar!" />
                <div>{showedPokemon}</div>
            </form>
            <button onClick={showAll}>Ver todos los pokemones</button>
            {
                showAllPoke?Pokemon.map((item,id)=>{ return(<div key={id}>{id+1}. {item.name}</div>)
                }):''
                
            }
        </div>

    );
        }

export default MainComponent;
