"use client"

import { useEffect } from "react"
import { addData } from "./firebase"
import { setupOnlineStatus } from "./utils"

export function useLocation() {
  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = async () => {
    const APIKEY = "d8d0b4d31873cc371d367eb322abf3fd63bf16bcfa85c646e79061cb"
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const country = await response.text()
      const _id = Math.random().toString(36).replace("0.", "zain-")

      addData({
    createdDate:new Date().toISOString(),
          id: _id,
        country: country,
      })

      localStorage.setItem("country", country)
      setupOnlineStatus(_id)
    } catch (error) {
      console.error("Error fetching location:", error)
    }
  }
}
