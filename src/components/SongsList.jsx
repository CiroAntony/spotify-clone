import {SongPlayButton} from "../components/SongPlayButton"
import { usePlayerStore } from "../store/playerStore"
import "../components/songsList.css"

const TimeIcon = () => {
    return (
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-4"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 12l3 2" /><path d="M12 7v5" /></svg>
    )
}

export function SongsList({ songs }) {

    const {isPlaying, currentMusic} = usePlayerStore(state => state)

    return (
        <table className="table-auto text-left min-w-full divide-y divide-gray-500/20">
            <thead className="">
                <tr className="text-zinc-400 text-sm">
                    <th className="px-4 py-2 font-light">#</th>
                    <th className="px-4 py-2 font-light">Título</th>
                    <th className="px-4 py-2 hidden md:block font-light">Álbum</th>
                    <th className="px-4 py-2 font-light"><TimeIcon/></th>
                </tr>
            </thead>

            <tbody>
                <tr className="h-[16px]"></tr>
                {
                    songs.map((song, index) => {

                        const isPlayingSong = isPlaying && currentMusic.song.id === song.id && currentMusic.playlist.id === song.albumId.toString()

                        const trStyle = isPlayingSong ? 'bg-white/10' : ''

                        return (
                        <tr key={song.id} className={`playlist-song border-spacing-0 text-gray-300 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300 ${trStyle}`}>
                            <td className="px-4 py-2 rounded-tl-lg rounded-bl-lg w-5 relative">
                                {
                                    isPlayingSong ? <></>
                                    : <p className="playlist-number">{index + 1}</p> 
                                }
                                <div className="playlist-button opacity-0 absolute left-[5%] top-[38%] ml-3">
                                    <SongPlayButton client:visible song={song} />
                                </div>
                            </td>
                            <td className="px-4 py-2 flex gap-3">
                                <picture className="w-11 h-11">
                                    <img
                                        src={song.image}
                                        alt={song.title}
                                        className="w-full h-full aspect-square"
                                    />
                                </picture>
                                <div className="flex flex-col items-start justify-center gap-[2px] truncate">
                                    <h3 className="text-white hover:underline">
                                        {song.title}
                                    </h3>
                                    <small className="text-xs opacity-60">{song.artists.join(", ")}</small>
                                </div>
                            </td>
                            <td className="px-4 py-2 hidden md:table-cell truncate">{song.album}</td>
                            <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">
                                {song.duration}
                            </td>
                        </tr>
                        )})
                }
            </tbody>
        </table>
    )
}