import { Pause, Play } from "./Player"
import { usePlayerStore } from "../store/playerStore"

export function CardPlayButton({ id, size = 'small', variant }) {
    const {isPlaying, setIsPlaying, currentMusic, setCurrentMusic,} = usePlayerStore(state => state)

    const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'

    const isPlayingPlaylist = isPlaying && currentMusic.playlist.id === id

    const {song} = currentMusic

    const handleClick = () => {
        if (isPlayingPlaylist) {
            setIsPlaying(false)
            return
        }

            fetch(`/api/get-music.json?id=${id}`)
            .then(res => res.json())
            .then(data => {
                const {songs, playlist} = data
    
                setIsPlaying(true)
                setCurrentMusic({songs, playlist, song: songs[0]})
            })
    }

    if (variant === 'large') {
        return (
            <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-5 hover:scale-105 transition hover:bg-green-400">
            {isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
            </button>
        )
    }

    if (variant === 'normal') {
        return (
            <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-3 hover:scale-105 transition hover:bg-green-400">
                {isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
            </button>
        )
    }
}