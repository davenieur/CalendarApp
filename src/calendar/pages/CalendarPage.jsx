import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesES } from '../../helpers'
import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../";
import { useState } from "react";
import { useCalendarStore, useUiStore } from '../../hooks';

// const events = [{
//   title:'Cumpleaños del jefe',
//   notes: 'Hay que comprar el pastel',
//   start: new Date(),
//   end: addHours( new Date(), 2),
//   bgColor: '#fafafa',
//   user: {
//     _id: '123',
//     name: 'David'
//   }
// }]

export const CalendarPage = () => {
  const {  openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      color: 'white',
      opacity: 0.8
    }

    return { style }
  } 

  const onDoubleClick = ( event ) => {
    // console.log( { doubleClick: event } )
    openDateModal();
  }

  const onSelect = ( event ) => {
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event);
  }

  return (
    <>
      <Navbar/>

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor="start"
        defaultView={ lastView }
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={ getMessagesES () }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal />

      <FabAddNew />
      <FabDelete />
    </>
  )
}