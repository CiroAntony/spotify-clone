import { playlists, songs as allSongs } from "../../lib/data";

export async function GET({params, request}) {
    const {url} = request
    const urlObject = new URL(url)
    const id = urlObject.searchParams.get('id')

    const playlist = playlists.find(playlist => playlist.id === id)
    const songs = allSongs.filter(song => song.albumId.toString() === id)

    return new Response(JSON.stringify({playlist, songs}), {
        headers: {"content-type" : "application/json"}
    })
}