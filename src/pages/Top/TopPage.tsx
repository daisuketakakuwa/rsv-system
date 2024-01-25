import { DATETIME_FOMRATS, formatDate } from '@/lib/DatetimeUtil';
import { fetchEvents } from '@/utils/requestHandler';
import { useEffect, useState } from 'react';

const TopPage = () => {
  const [events, setEvents] = useState([] as EventInfo[]);

  useEffect(() => {
    fetchEvents().then((result) => setEvents(result.events));
  }, []);

  return (
    // paddingLeft + width = 100%
    <div style={{ margin: '0px 10px', width: '95%' }}>
      <h2>イベント一覧</h2>
      <div>
        {events.map((e) => (
          <div
            key={e.id}
            style={{
              padding: '10px',
              border: '3px solid gray',
              borderRadius: '7px',
              margin: '5px 0px',
            }}>
            <h3 style={{ margin: '5px 0px' }}>{e.eventName}</h3>
            <div style={{ width: '100%', border: '1px solid gray', margin: '10px 0px' }}></div>
            <p>{e.eventDetail}</p>
            <div style={{ margin: '5px 0px' }}>
              <span
                style={{
                  display: 'inline-block',
                  color: 'white',
                  backgroundColor: '#5f5f5f',
                  padding: '0px 10px',
                  border: '0px',
                  borderRadius: '5px',
                  marginRight: '5px',
                }}>
                開始時刻
              </span>
              {formatDate(e.startDatetime, DATETIME_FOMRATS.FORMAT1)}
            </div>
            <div style={{ margin: '5px 0px' }}>
              <span
                style={{
                  display: 'inline-block',
                  color: 'white',
                  backgroundColor: '#5f5f5f',
                  padding: '0px 10px',
                  border: '0px',
                  borderRadius: '5px',
                  marginRight: '5px',
                }}>
                終了時刻
              </span>
              {formatDate(e.endDatetime, DATETIME_FOMRATS.FORMAT1)}
            </div>
            <div style={{ margin: '5px 0px' }}>
              <span
                style={{
                  display: 'inline-block',
                  color: 'white',
                  backgroundColor: '#5f5f5f',
                  padding: '0px 10px',
                  border: '0px',
                  borderRadius: '5px',
                  marginRight: '5px',
                  marginLeft: '32px',
                }}>
                定員
              </span>
              {e.capacity} 人
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPage;
