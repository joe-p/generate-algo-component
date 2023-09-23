/* eslint-disable no-console */
import algosdk from 'algosdk'
import { ReactNode, useState } from 'react'
import { Dao, DaoClient } from '../DaoClient.ts'

/* Example usage
<DaoVote
  algodClient={algodClient}
  appID={appID}
  buttonClass="btn m-2"
  buttonLoadingNode=<span className="loading loading-spinner" />
  buttonNode="Call vote"
  typedClient={typedClient}
  inFavor={inFavor}
  registeredASA={registeredASA}
/>
*/
type DaoVoteArgs = Dao['methods']['vote(bool,asset)void']['argsObj']

type Props = {
  algodClient: algosdk.Algodv2
  appID: number
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: DaoClient
  inFavor: DaoVoteArgs['inFavor']
  registeredASA: DaoVoteArgs['registeredASA']
}

const DaoVote = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling vote`)
    await props.typedClient.vote({
      inFavor: props.inFavor,
      registeredASA: props.registeredASA,
    })
    
    setLoading(false)
  }

  return (
    <button className={props.buttonClass} onClick={callMethod}>
      {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode}
    </button>
  )
}

export default DaoVote