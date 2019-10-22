import React, { useState } from 'react'

import DropDown from './DropDown'
import { allActionsBlock } from '../../../../../../Constants'
import './style.scss'

const AllActionsBlock = () => {

  const [dropDownState, setDropDownState] = useState(false);
  const handleEvents = {
    showMore: {
      onClick: setDropDownState(!dropDownState)
    },
    customize: {
      onClick: () => {}
    },
    manageFiles: {
      onClick: () => {}
    },
    embed: {
      onClick: () => {}
    }
  };

return (
    <div className="all_actions_block">
      {allActionsBlock.map(action =>
        (<a key={action.rel}
            className={action.className}
            data-eventname={action['data-eventname'] ? action['data-eventname'] : ''}
            rel={action.rel ? action.rel : ''}
            {...handleEvents[action.events]}
          >
            <i className={action.i.className}
               data-eventname={action.i['data-eventname'] ? action.i['data-eventname'] : ''}
            />
            <b className={action.b.className}>{action.b.text}</b>
          </a>
        )
      )}
      <DropDown open={dropDownState}/>
    </div>
)};

export default AllActionsBlock;
