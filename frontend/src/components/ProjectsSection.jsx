import React, { useState, useEffect } from "react";
import axios from "axios";
import { ExternalLink, Calendar, MapPin } from "lucide-react";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects");
      setProjects(response.data.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <section id="projects" className="p-6">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="border p-4 rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <p className="text-gray-600">{project.description}</p>

            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar size={16} /> {project.createdAt}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {project.location || "Remote"}
              </span>
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 mt-3"
              >
                View Project <ExternalLink size={16} />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
