import { useState, useEffect } from 'react'

const BASE = 'https://www.emsifa.com/api-wilayah-indonesia/api'

export function useWilayah() {
  const [provinsi, setProvinsi]         = useState([])
  const [kabupaten, setKabupaten]       = useState([])
  const [kecamatan, setKecamatan]       = useState([])
  const [desa, setDesa]                 = useState([])
  const [loadingProv, setLoadingProv]   = useState(false)
  const [loadingKab, setLoadingKab]     = useState(false)
  const [loadingKec, setLoadingKec]     = useState(false)
  const [loadingDes, setLoadingDes]     = useState(false)

  useEffect(() => {
    setLoadingProv(true)
    fetch(`${BASE}/provinces.json`)
      .then(r => r.json())
      .then(setProvinsi)
      .catch(() => setProvinsi([]))
      .finally(() => setLoadingProv(false))
  }, [])

  const fetchKabupaten = (provId) => {
    if (!provId) { setKabupaten([]); setKecamatan([]); setDesa([]); return }
    setLoadingKab(true)
    fetch(`${BASE}/regencies/${provId}.json`)
      .then(r => r.json())
      .then(data => { setKabupaten(data); setKecamatan([]); setDesa([]) })
      .catch(() => setKabupaten([]))
      .finally(() => setLoadingKab(false))
  }

  const fetchKecamatan = (kabId) => {
    if (!kabId) { setKecamatan([]); setDesa([]); return }
    setLoadingKec(true)
    fetch(`${BASE}/districts/${kabId}.json`)
      .then(r => r.json())
      .then(data => { setKecamatan(data); setDesa([]) })
      .catch(() => setKecamatan([]))
      .finally(() => setLoadingKec(false))
  }

  const fetchDesa = (kecId) => {
    if (!kecId) { setDesa([]); return }
    setLoadingDes(true)
    fetch(`${BASE}/villages/${kecId}.json`)
      .then(r => r.json())
      .then(setDesa)
      .catch(() => setDesa([]))
      .finally(() => setLoadingDes(false))
  }

  return {
    provinsi, kabupaten, kecamatan, desa,
    fetchKabupaten, fetchKecamatan, fetchDesa,
    loadingProv, loadingKab, loadingKec, loadingDes,
  }
}
