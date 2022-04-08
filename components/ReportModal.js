import React from 'react'
import { Modal } from '@mantine/core'

function ReportModal({ reportOpen, setReportOpen }) {
  return (
    <div>
      <Modal
        title="Feature Coming Soon!"
        opened={reportOpen}
        onClose={() => setReportOpen(false)}
      >
        <h1 className="text-center text-xl text-green-500">
          This Feature Will be here very Soon!
        </h1>
      </Modal>
    </div>
  )
}

export default ReportModal
