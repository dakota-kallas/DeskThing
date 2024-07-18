import { useEffect, useState } from 'react'
import { IconLogoGearLoading } from '../icons'
import githubStore, { GithubRelease, GithubAsset } from '../../store/githubStore'

const Web = (): JSX.Element => {
  const [releases, setReleases] = useState<GithubRelease[]>([])
  const [openReleaseId, setOpenReleaseId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await githubStore.fetchReleases('https://github.com/ItsRiprod/DeskThing')
      setReleases(data)
    }

    fetchData()
  }, [])

  const toggleDropdown = (releaseId: number): void => {
    setOpenReleaseId(openReleaseId === releaseId ? null : releaseId)
  }

  const filterAssets = (assets: GithubAsset[]): GithubAsset[] => {
    return assets.filter((asset) => asset.name.includes('deskthing-client-build'))
  }

  const handleAssetClick = async (asset: GithubAsset): Promise<void> => {
    // Send the selected asset to Electron backend for extraction
    setLoading(true)
    try {
      window.electron.ipcRenderer.send('extract-webapp-zip', asset.browser_download_url)
      window.electron.ipcRenderer.once('zip-extracted', (_event, reply) => {
        console.log(reply)
        setLoading(false)
        if (!reply.success) {
          setError(reply.error || 'Unknown error occurred')
        } else {
          // Optionally handle success, e.g., navigate to the extracted app
        }
      })
    } catch (error) {
      setLoading(false)
      if (error) {
        setError(JSON.stringify(error))
      }
    }
  }

  return (
    <div className="pt-5 flex flex-col justify-around items-center">
      <ul className="w-full max-w-2xl">
        {loading ? (
          <li className="mb-4">
            <div className="">
              <IconLogoGearLoading iconSize={256} />
            </div>
          </li>
        ) : error ? (
          <li className="mb-4">
            <div className="w-full px-4 py-2 text-left border rounded-xl hover:bg-zinc-900 focus:outline-none">
              {error}
            </div>
          </li>
        ) : (
          releases.map((release) => (
            <li key={release.id} className="mb-4">
              <button
                className="w-full px-4 py-2 text-left border rounded-xl hover:bg-zinc-900 focus:outline-none"
                onClick={() => toggleDropdown(release.id)}
              >
                {release.name}
              </button>
              {openReleaseId === release.id && (
                <div className="mt-2 pl-4">
                  {filterAssets(release.assets).map((asset) => (
                    <button
                      key={asset.id}
                      className="block px-4 py-2 mb-2 text-sm text-blue-600 border rounded-xl hover:bg-zinc-900"
                      onClick={() => handleAssetClick(asset)}
                    >
                      {asset.name}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default Web