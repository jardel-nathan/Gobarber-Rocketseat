import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FiClock, FiPower } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/Auth";
import { Container, HeaderContent, Profile, Header, Content, Schedule, Calendar, NextAppointment, Section, Appointment } from "./styles";
import { isEqual, isToday, format, parseISO, isAfter } from "date-fns";
import { ptBR } from "date-fns/locale";

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import api from "../../services/api";
import {Link} from "react-router-dom";

interface MonthAvailabilityItem {
 day: number;
 available: boolean;
}

interface Appointment {
 id: string;
 date: string;
 hourFormatted: string;
 user: {
  name: string;
  avatar_url: string;
 };
}



export const Dashboard: React.FC = () => {
 const { signOut, user } = useAuth();
 const [selectedDay, setSelectedDay] = React.useState<Date>(new Date());

 const [monthAvalability, setMonthAvalability] = useState<MonthAvailabilityItem[]>([]);

 const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

 const [appointments, setAppointments] = useState<Appointment[]>([]);

 const handleDateChange = useCallback((date: Date) => {
  setSelectedDay(date)
 }, []);

 const handleMonthChange = useCallback((date: Date) => {
  if (date) {
   setCurrentMonth(date)
  }
 }, []);

 useEffect(() => {
  console.log(api.defaults.headers)
  api.get(`/provider/${user.id}/month-availability`, {
   params: {
    year: (selectedDay) ? selectedDay.getFullYear() : new Date().getFullYear(),
    month: currentMonth.getMonth() + 1,
   }
  }).then(response => {
   setMonthAvalability(response.data)

  })

 }, [currentMonth])


 useEffect(() => {

  api.get<Appointment[]>('appointments/me', {
   params: {
    year: selectedDay.getFullYear(),
    month: selectedDay.getMonth() + 1,
    day: selectedDay.getDate()
   }

  }).then(response => {

   const appointmentsFormatted = response.data.map(appointment => {
    return {
     ...appointment,
     hourFormatted: format(parseISO(appointment.date), 'HH:mm')
    }
   })

   setAppointments(appointmentsFormatted)

  })


 }, [selectedDay])


 const disabledDays = useMemo(() => {

  const dates = monthAvalability.filter(monthDay => monthDay.available === false)
   .map(monthDay => {

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    return new Date(year, month, monthDay.day)
   })

  return dates
 }, [currentMonth, monthAvalability])


 const selectedDateAsText = useMemo(() => {
  return format(selectedDay, "'Dia' dd 'de' MMMM", { locale: ptBR })
 }, [selectedDay])

 const selectedWeekDay = useMemo(() => {
  return format(selectedDay, 'cccc', { locale: ptBR })
 }, [selectedDay])


 const morningAppointments = useMemo(() => {
  return appointments.filter(appointment => {
   return parseISO(appointment.date).getHours() < 12
  })
 }, [appointments])

 const afternoonAppointments = useMemo(() => {
  return appointments.filter(appointment => {
   return parseISO(appointment.date).getHours() >= 12
  })
 }, [appointments])

 const nextAppointment = useMemo(() => {
  return appointments.find(appointment =>
   isAfter(parseISO(appointment.date), new Date()))
 }, [appointments])




 return (

  <Container>
   <Header>
    <HeaderContent>
     <img src={logoImg} alt="" />
     <Profile>
      <img src={user.avatar_url} alt={user.name} />
      <div>
       <span>Bem vindo,</span>
      <Link to="/profile"> <strong>{user.name}</strong> </Link>
      </div>
     </Profile>
     <button onClick={signOut}>
      <FiPower />
     </button>
    </HeaderContent>
   </Header>
   <Content>
    <Schedule>
     <h1> Horários Agendados </h1>
     <p>
      {isToday(selectedDay as Date) ? <span> Hoje </span> : ''}
      <span>{selectedDateAsText}</span>
      <span>{selectedWeekDay}</span>
     </p>


  
     {isToday(selectedDay as Date) && nextAppointment && (
      <NextAppointment>
       <strong>Agendamento a seguir</strong>
       <div>
        <img src={nextAppointment.user.avatar_url} alt={nextAppointment.user.name} />
        <strong>{nextAppointment.user.name}</strong>
        <span>
         <FiClock />
         {nextAppointment.hourFormatted}
        </span>
       </div>
      </NextAppointment>
     )}


     <Section>

      <strong>Manhã</strong>

      {morningAppointments.length === 0 && (
       <p>Nenhum agendamento neste período</p>
      )}


      {morningAppointments.map(appointment => (
       <Appointment key={appointment.id}>
        <span>
         <FiClock />
         {appointment.hourFormatted}
        </span>
        <div>
         <img src={appointment.user.avatar_url} alt={appointment.user.name} />
         <strong>{appointment.user.name}</strong>
        </div>
       </Appointment>
      ))}


      <strong>Tarde</strong>

      {afternoonAppointments.length === 0 && (
       <p>Nenhum agendamento neste período</p>
      )}

      {afternoonAppointments.map(appointment => (
       <Appointment key={appointment.id}>
        <span>
         <FiClock />
         {appointment.hourFormatted}
        </span>
        <div>
         <img src={appointment.user.avatar_url} alt={appointment.user.name} />
         <strong>{appointment.user.name}</strong>
        </div>
       </Appointment>
      ))}




     </Section>

    </Schedule>
    <Calendar>
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
       displayStaticWrapperAs="desktop"
       openTo="day"
       value={selectedDay}
       onChange={(newValue) => {
        handleDateChange(newValue as Date);
       }}
       onMonthChange={(newValue) => {
        handleMonthChange(newValue);
       }}
       renderInput={(params) => <TextField {...params} />}
       shouldDisableDate={(date: Date) => !!disabledDays.find(disableDate => isEqual(date, disableDate))}

      />
     </LocalizationProvider>
    </Calendar>
   </Content>
  </Container>

 )

}