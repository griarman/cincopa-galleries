import React, { useState, useEffect } from 'react';

import DomainsList from './DomainsList';

import './style.scss';


const GalleryItems = ({ days, items, hits, fid }) => {
  const [domainState, setDomainState] = useState(false);
  let domainsList;

  let domains = days.reduce((sum, el) => sum + el.urls.length, 0);

  domainsList = days.flatMap(({ urls }) => urls);

  const uniqueDomainsList = !domainsList.length ? [] : domainsList.reduce((list, item) => {
    if (!list.length) {
      list.push(item);
      return list;
    }
    const newList = list.findIndex(el => el.url === item.url);

    if (newList === -1) list.push(item);
    else list[newList].hits += item.hits;

    return list;
  }, []);

  return (
    <td className='galleryItems'>
      <div>
        <div className='galleryDomains' onClick={() => {
          setDomainState(true);
        }}
        >
          <i className='icon-domain'/>
          <span>
            <b>{uniqueDomainsList.length}</b> domains
          </span>
          {domainState &&
            <div
              className="overLine"
              onClick={e => { e.stopPropagation(); setDomainState(false); }}
            />
          }
          <DomainsList
            fid={fid}
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