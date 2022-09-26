import debugLib from 'debug'
import { LinkStatus } from '../interfaces/ILinks';
import { axiosInstanceBack } from '../utilities/axios';
const debug = debugLib('AIDEA:LinkService')
export const updateSentMssgLink = async ({ mssgId, ack }: { mssgId: string; ack: string }) => {
    try {
      debug('[update mssg]')
      let status: LinkStatus
      switch (ack) {
        case 'received':
          status = LinkStatus.RECEIVED
          break
        default:
          status = LinkStatus.SENDED
          break
      }
      await axiosInstanceBack.post("/link/mssg", {mssgId, status})
    //   await db.Links.update({ status }, { where: { mssgId } })
    } catch (error) {
      debug(error)
      console.log(error)
      throw new Error((error as Error).message)
    }
  }