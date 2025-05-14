import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import weekdaysAbbr from '../utils/weekdaysAbbr';
import moment from 'moment';
import 'moment/locale/pt-br';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

moment.locale('pt-br');

function ProgramSchedule() {
  const [selectedDay, setSelectedDay] = useState(
    moment().locale('en').format('dddd').toLowerCase()
  );
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetables = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/timetables/day', {
          params: { day: selectedDay }
        });
        setTimetables(response.data);
      } catch (error) {
        console.error('Erro ao buscar programação:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTimetables();
  }, [selectedDay]);

  const diasSemana = Object.keys(weekdaysAbbr);
  const isCurrent = (start, end) => {
    const now = moment();
    const startTime = moment(start, 'HH:mm');
    const endTime = moment(end, 'HH:mm');
    return now.isBetween(startTime, endTime);
  };

  return (
    <div className="container">
      <h2 className="section-title">Programação do Dia</h2>
      <div className="btn-group mb-4">
        {loading
          ? Array(diasSemana.length)
            .fill()
            .map((_, idx) => (
              <Skeleton
                key={idx}
                width={50}
                height={30}
                style={{ marginRight: '4px' }}
              />
            ))
          : diasSemana.map((dia) => (
            <button
              key={dia}
              onClick={() => setSelectedDay(dia)}
              className={`btn btn-sm ${selectedDay === dia ? 'btn-primary' : 'btn-outline-primary'
                }`}
            >
              {weekdaysAbbr[dia]}
            </button>
          ))}
      </div>

      {loading
        ? Array(3)
          .fill()
          .map((_, idx) => (
            <div className="card mb-2 shadow-sm" key={idx}>
              <div className="card-body">
                <Skeleton width={`40%`} />
                <Skeleton width={`60%`} style={{ marginTop: '8px' }} />
                <Skeleton width={80} height={20} style={{ marginTop: '8px' }} />
              </div>
            </div>
          ))
        : timetables.map((item, idx) => {
          const emExibicao = isCurrent(
            item.hour_start,
            item.hour_finish
          );
          return (
            <div
              key={idx}
              className={`card mb-2 shadow-sm ${!emExibicao ? 'opacity-50' : ''
                }`}
            >
              <div className="card-body">
                <h5 className="card-title">{item.program_name}</h5>
                <p className="card-text">
                  {item.hour_start} às {item.hour_finish}
                </p>
                {emExibicao && (
                  <span className="badge bg-success">No ar agora</span>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ProgramSchedule;
