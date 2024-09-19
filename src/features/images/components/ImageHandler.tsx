import { SyntheticEvent, useState } from 'react'
import { Dialog, Tab, Tabs } from '@mui/material'
import Paper from '@mui/material/Paper'
import TabPanel from '../../../components/TabPanel.tsx'
import { SelectImage } from './SelectImage.tsx'
import { UploadImage } from './UploadImage.tsx'
import { useImages } from '../hooks/useImages.ts'

interface ImageHandlerProps {
  open: boolean,
  toggle: () => void,
  callback: (_: any) => void
}

export const ImageHandler = ({ open, toggle, callback }: ImageHandlerProps) => {
  const [value, setValue] = useState(0)

  const { images, upload, update, remove } = useImages()

  const handleChange = (_: SyntheticEvent, newValue: any) => {
    setValue(newValue)
  }

  return (
    <Paper elevation={20}>
      <Dialog open={open}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: '50%' }} label="Images" />

          <Tab style={{ width: '50%' }} label="Upload image" />
        </Tabs>
        <TabPanel value={value} index={0} style={{ overflow: 'hidden' }}>
          <SelectImage
            images={images}
            update={update}
            remove={remove}
            toggle={toggle}
            callback={callback}
          />
        </TabPanel>
        <TabPanel value={value} index={1} style={{ overflow: 'hidden' }}>
          <UploadImage upload={upload} toggle={toggle} callback={callback} />
        </TabPanel>
      </Dialog>
    </Paper>
  )
}
