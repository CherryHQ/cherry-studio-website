import { useEffect, useState } from 'react'

import { getEnterpriseData } from '@/assets/js/data'

interface EnterpriseData {
  data: {
    id: number
    contact_qrcode: string
  }
}

export function useEnterpriseData() {
  const [enterpriseData, setEnterpriseData] = useState<EnterpriseData | null>(null)

  useEffect(() => {
    const fetchEnterpriseData = async () => {
      const data = await getEnterpriseData()
      setEnterpriseData(data)
    }
    fetchEnterpriseData()
  }, [])

  return enterpriseData
}
