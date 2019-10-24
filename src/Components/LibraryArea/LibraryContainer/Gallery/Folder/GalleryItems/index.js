import React, { useState, useEffect } from 'react'

import DomainsList from './DomainsList'
import './style.scss'


const GalleryItems = props => {

  const { days, items, hits } = props;
  const [domainState, setDomainState] = useState(false);
  let domains = 0, domainsList;

  days.forEach(el => {
    domains += el.urls.length
  });

  domainsList = days.reduce((list, { urls }) => {
    if (!urls.length) return list;
    list.push(...urls);
    return list;
  }, []);

  const uniqueDomainsList = !domainsList.length ? [] : domainsList.reduce((list, item) => {
    if (!list.length) {
      list.push(item);
      return list;
    }
    let newList;
    ((newList = list.findIndex(el => el.url === item.url)) === -1) ? list.push(item) : list[newList].hits += item.hits;

    return list;
  }, []);

  console.log(uniqueDomainsList);

  // useEffect(() => {
  //   if(domainState) document.addEventListener('click', close);
  //   else document.removeEventListener('click', close);
  // });

  return (
    <td className='galleryItems'>
      <div>
        <div className='galleryDomains' onClick={e => {
          setDomainState()
        }}>
          <i className='icon-domain'/>
          <span>
            <b>{uniqueDomainsList.length}</b> domains
          </span>
          <DomainsList
            domainState={domainState}
            domains={domains}
            uniqueDomainsList={uniqueDomainsList}
          />
        </div>
        <div className='galleryFiles' onClick={() => {}}>
          <i className='icon-folder'/>
          <span>
            <b>{items}</b> items
          </span>
        </div>
      </div>
    </td>
  );
};


export default GalleryItems;