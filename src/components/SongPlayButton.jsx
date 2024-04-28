import { usePlayerStore } from "../store/playerStore";
import { Pause, Play } from "./Player";

export function SongPlayButton({song}) {
    const { setCurrentMusic, setIsPlaying, isPlaying, currentMusic} = usePlayerStore(state => state)

    const isPlayingSong = isPlaying && currentMusic.song.id === song.id && currentMusic.playlist.id === song.albumId.toString()

    const reproduceSong = () => {
        if (isPlayingSong) {
            setIsPlaying(false)
            return
        }
        fetch(`/api/get-music.json?id=${song.albumId}`)
            .then(res => res.json())
            .then(data => {
                const {songs, playlist} = data
    
                setIsPlaying(true)
                setCurrentMusic({songs, playlist, song: songs[song.id - 1]})
            })
    }

    return (
        <button onClick={reproduceSong}>
            {
                isPlayingSong 
                ? <Pause className='text-white hover:text-green-500'/>
                : <Play className='text-white hover:text-green-500'/>
            }
        </button>
    )
}