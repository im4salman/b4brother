// src/components/ServiceModal.jsx

import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const modalVariants = {
  hidden: { y: '-20%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 }
  },
};

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  // Prepare chart data
  const labels = service.stats.map((s) => s.label);
  const dataValues = service.stats.map((s) => s.value);
  const data = {
    labels,
    datasets: [
      {
        label: service.title,
        data: dataValues,
        backgroundColor: 'rgba(245, 158, 11, 0.7)', // amber-500 @ 70%
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `${service.title} Stats`,
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-[90%] p-6 relative overflow-y-auto max-h-[90vh]"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Service Header */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <img src={service.icon} alt={service.title} className="w-16 h-16" />
          <h2 className="text-3xl font-bold text-black">{service.title}</h2>
          <p className="text-gray-600 text-center whitespace-pre-line">
            {service.details}
          </p>
        </div>

        {/* Chart Section */}
        <div className="mb-6">
          <Bar data={data} options={options} />
        </div>

        {/* Insights */}
        {service.insights && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Key Insights</h3>
            <ul className="list-disc list-inside text-gray-700">
              {service.insights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ServiceModal;
