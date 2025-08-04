import React from 'react';
import { motion } from 'framer-motion';
import LazyImage from './LazyImage';

const ProjectCard = ({ project, onClick }) => {
  const handleClick = () => {
    if (onClick) onClick(project);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      className="group cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-200 rounded-2xl"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card overflow-hidden h-full">
        {/* Project Image */}
        <div className="relative overflow-hidden">
          <LazyImage
            src={project.image}
            alt={`${project.title} - ${project.category} project completed in ${project.year}`}
            className="w-full h-64 group-hover:scale-110 transition-transform duration-500"
            placeholder="bg-gray-200 animate-pulse"
          />
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between text-white">
                <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Project Year Badge */}
          <div className="absolute top-4 right-4 bg-primary-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-medium">
            {project.year}
          </div>
        </div>

        {/* Project Details */}
        <div className="p-6">
          <div className="mb-3">
            <span className="inline-block bg-gray-100 text-secondary-600 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
              {project.category}
            </span>
          </div>
          
          <h3 className="heading-tertiary text-lg mb-3 group-hover:text-primary-500 transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>
          
          <p className="text-body text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Project Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center text-secondary-500 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {project.year}
            </div>
            
            <div className="flex items-center text-primary-500 font-medium text-sm group-hover:text-primary-600 transition-colors duration-300">
              <span>View Details</span>
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
