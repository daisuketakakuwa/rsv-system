import SlideButton from '@/components/SlideButton/SlideButton';
import { saveEvent } from '@/utils/requestHandler';
import { useState } from 'react';

const CreateEventPage = () => {
  const [eventName, setEventName] = useState('');
  const [eventDetail, setEventDetail] = useState('');
  const [startDatetime, setStartDatetime] = useState('');
  const [endDatetime, setEndDatetime] = useState('');
  const [capacity, setCapacity] = useState('');

  return (
    <div style={{ padding: '20px' }}>
      <h2>イベント名</h2>
      <textarea
        onChange={(e) => setEventName(e.target.value)}
        style={{
          minWidth: '100%',
          maxWidth: '100%',
          height: '25px',
          minHeight: '25px',
          maxHeight: '80px',
          padding: '0px 5px',
        }}
      />
      <h2>イベント詳細</h2>
      <textarea
        onChange={(e) => setEventDetail(e.target.value)}
        style={{
          minWidth: '100%',
          maxWidth: '100%',
          height: '75px',
          minHeight: '75px',
          maxHeight: '200px',
          padding: '0px 5px',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ width: '100px', textAlign: 'center', marginRight: '20px' }}>開始日時</h2>
        <input
          type="datetime-local"
          onChange={(e) => setStartDatetime(e.target.value)}
          style={{ display: 'block', height: '32px', padding: '0px 10px' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ width: '100px', textAlign: 'center', marginRight: '20px' }}>終了日時</h2>
        <input
          type="datetime-local"
          onChange={(e) => setEndDatetime(e.target.value)}
          style={{ display: 'block', height: '32px', padding: '0px 10px' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ width: '100px', textAlign: 'center', marginRight: '20px' }}>定員</h2>
        <input
          type="text"
          onChange={(e) => setCapacity(e.target.value)}
          style={{ width: '50px', height: '30px' }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <SlideButton
          onClick={() => {
            // TODO: これもdispatcherの１つにして
            //   BEGIN: set loading true
            //   
            saveEvent(eventName, eventDetail, startDatetime, endDatetime, capacity);
          }}>
          登録
        </SlideButton>
      </div>
    </div>
  );
};

export default CreateEventPage;
