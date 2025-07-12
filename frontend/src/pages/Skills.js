import React, { useState, useEffect } from 'react';
import { skillsAPI } from '../services/api';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', type: 'offered' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await skillsAPI.getSkills();
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const addSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;

    setLoading(true);
    try {
      await skillsAPI.addSkill(newSkill);
      setNewSkill({ name: '', type: 'offered' });
      fetchSkills();
    } catch (error) {
      alert('Error adding skill');
    }
    setLoading(false);
  };

  const deleteSkill = async (id) => {
    try {
      await skillsAPI.deleteSkill(id);
      fetchSkills();
    } catch (error) {
      alert('Error deleting skill');
    }
  };

  const offeredSkills = skills.filter(skill => skill.type === 'offered');
  const wantedSkills = skills.filter(skill => skill.type === 'wanted');

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-4xl font-bold font-poppins bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            My Skills Portfolio
          </h1>
          <p className="text-slate-400 text-lg font-inter">Showcase what you can teach and what you want to learn</p>
        </div>

        {/* Add New Skill */}
        <div className="glass-card rounded-3xl p-8 mb-8 animate-fadeInUp">
          <h2 className="text-xl font-semibold text-white mb-6 font-poppins flex items-center">
            ✨ Add New Skill
          </h2>
          <form onSubmit={addSkill} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
              placeholder="Enter skill name (e.g., JavaScript, Guitar, Cooking)"
              className="input-glass flex-1 px-4 py-3 rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              required
            />
            <select
              value={newSkill.type}
              onChange={(e) => setNewSkill({...newSkill, type: e.target.value})}
              className="input-glass px-4 py-3 rounded-2xl focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 md:w-48"
            >
              <option value="offered">🎓 I Can Teach</option>
              <option value="wanted">📚 I Want to Learn</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-8 py-3 rounded-2xl font-medium font-inter disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding...
                </div>
              ) : (
                '+ Add Skill'
              )}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills I Can Teach */}
          <div className="glass-card rounded-3xl p-8 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white font-poppins">Skills I Can Teach</h2>
                <p className="text-slate-400 text-sm font-inter">{offeredSkills.length} skills available</p>
              </div>
            </div>
            
            {offeredSkills.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🎯</div>
                <p className="text-slate-400 font-inter">No teaching skills added yet</p>
                <p className="text-slate-500 text-sm font-inter mt-2">Add skills you can share with others</p>
              </div>
            ) : (
              <div className="space-y-3">
                {offeredSkills.map((skill, index) => (
                  <div 
                    key={skill.id} 
                    className="skill-tag-offered flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-105"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="flex items-center">
                      <span className="text-lg mr-3">🌟</span>
                      <span className="font-medium font-inter">{skill.name}</span>
                    </div>
                    <button
                      onClick={() => deleteSkill(skill.id)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-300 p-2 hover:bg-red-500/10 rounded-xl"
                      title="Remove skill"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Skills I Want to Learn */}
          <div className="glass-card rounded-3xl p-8 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white font-poppins">Skills I Want to Learn</h2>
                <p className="text-slate-400 text-sm font-inter">{wantedSkills.length} learning goals</p>
              </div>
            </div>
            
            {wantedSkills.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🚀</div>
                <p className="text-slate-400 font-inter">No learning goals set yet</p>
                <p className="text-slate-500 text-sm font-inter mt-2">Add skills you want to master</p>
              </div>
            ) : (
              <div className="space-y-3">
                {wantedSkills.map((skill, index) => (
                  <div 
                    key={skill.id} 
                    className="skill-tag-wanted flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-105"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="flex items-center">
                      <span className="text-lg mr-3">🎯</span>
                      <span className="font-medium font-inter">{skill.name}</span>
                    </div>
                    <button
                      onClick={() => deleteSkill(skill.id)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-300 p-2 hover:bg-red-500/10 rounded-xl"
                      title="Remove skill"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="glass-card rounded-3xl p-8 mt-8 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-4 font-poppins">Your Skills Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 font-poppins">{offeredSkills.length}</div>
                <div className="text-slate-400 text-sm font-inter">Can Teach</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400 font-poppins">{wantedSkills.length}</div>
                <div className="text-slate-400 text-sm font-inter">Want to Learn</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 font-poppins">{skills.length}</div>
                <div className="text-slate-400 text-sm font-inter">Total Skills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 font-poppins">
                  {offeredSkills.length > 0 ? '🔥' : '💪'}
                </div>
                <div className="text-slate-400 text-sm font-inter">
                  {offeredSkills.length > 0 ? 'Ready to Teach' : 'Keep Building'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;