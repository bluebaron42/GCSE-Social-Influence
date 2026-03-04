import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X, Menu, Users, ClipboardList, Brain, Lightbulb, CheckSquare, Gamepad2, BookOpen, Scale, PenTool, Zap, MapPin, UserCog, FlaskConical, FileText } from 'lucide-react';
import Slide from './components/Slide';
import PhaseHeader from './components/PhaseHeader';
import DoNowQuiz from './components/DoNowQuiz';
import UnderstandingCheck from './components/UnderstandingCheck';
import Lesson1Concept1 from './components/Lesson1Concept1';
import Lesson1Concept2 from './components/Lesson1Concept2';
import Lesson1EvidenceGrid from './components/Lesson1EvidenceGrid';
import Lesson1CritiqueGrid from './components/Lesson1CritiqueGrid';
import Lesson1EssayPlan from './components/Lesson1EssayPlan';
import Lesson1Simulation from './components/Lesson1Simulation';
// Lesson 2 imports
import Lesson2DoNow from './components/Lesson2DoNow';
import Lesson2MilgramStudy from './components/Lesson2MilgramStudy';
import Lesson2SituationalFactors from './components/Lesson2SituationalFactors';
import Lesson2KnowledgeCheck from './components/Lesson2KnowledgeCheck';
import Lesson2AgencyTheory from './components/Lesson2AgencyTheory';
import Lesson2Simulation from './components/Lesson2Simulation';
import Lesson2Evaluation from './components/Lesson2Evaluation';
import Lesson2EssayPlan from './components/Lesson2EssayPlan';
// Lesson 3 imports
import Lesson3DoNow from './components/Lesson3DoNow';
import Lesson3Dispositional from './components/Lesson3Dispositional';
import Lesson3AuthoritarianPersonality from './components/Lesson3AuthoritarianPersonality';
import Lesson3KnowledgeCheck from './components/Lesson3KnowledgeCheck';
import Lesson3Simulation from './components/Lesson3Simulation';
import Lesson3Evaluation from './components/Lesson3Evaluation';
import Lesson3EssayPlan from './components/Lesson3EssayPlan';
// Lesson 4 imports
import Lesson4DoNow from './components/Lesson4DoNow';
import Lesson4MoscoviciStudy from './components/Lesson4MoscoviciStudy';
import Lesson4MinorityFactors from './components/Lesson4MinorityFactors';
import Lesson4KnowledgeCheck from './components/Lesson4KnowledgeCheck';
import Lesson4Simulation from './components/Lesson4Simulation';
import Lesson4Evaluation from './components/Lesson4Evaluation';
import Lesson4EssayPlan from './components/Lesson4EssayPlan';
// Lesson 5 imports
import Lesson5DoNow from './components/Lesson5DoNow';
import Lesson5Deindividuation from './components/Lesson5Deindividuation';
import Lesson5ReicherStudy from './components/Lesson5ReicherStudy';
import Lesson5KnowledgeCheck from './components/Lesson5KnowledgeCheck';
import Lesson5Simulation from './components/Lesson5Simulation';
import Lesson5Evaluation from './components/Lesson5Evaluation';
import Lesson5EssayPlan from './components/Lesson5EssayPlan';
// Lesson 6 imports
import Lesson6DoNow from './components/Lesson6DoNow';
import Lesson6SocialFactors from './components/Lesson6SocialFactors';
import Lesson6DispositionalFactors from './components/Lesson6DispositionalFactors';
import Lesson6KnowledgeCheck from './components/Lesson6KnowledgeCheck';
import Lesson6Simulation from './components/Lesson6Simulation';
import Lesson6Evaluation from './components/Lesson6Evaluation';
import Lesson6EssayPlan from './components/Lesson6EssayPlan';
import { lesson1DoNow, lesson1UnderstandingCheck, lessonThemes } from './constants';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [isPresentation, setIsPresentation] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const lessonTheme = lessonThemes.find(t => t.lesson === currentLesson);
  const themeColor = lessonTheme?.color || 'cyan';

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev < 9 ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
  }, []);

  const togglePresentation = useCallback(async () => {
    if (!isPresentation) {
      try {
        await document.documentElement.requestFullscreen();
        setIsPresentation(true);
      } catch (err) {
        console.error('Fullscreen error:', err);
        setIsPresentation(true);
      }
    } else {
      try {
        await document.exitFullscreen();
      } catch (err) {
        console.error('Exit fullscreen error:', err);
      }
      setIsPresentation(false);
    }
  }, [isPresentation]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPresentation) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') togglePresentation();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPresentation, nextSlide, prevSlide, togglePresentation]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [currentLesson]);

  const renderLesson1 = () => {
    switch (currentSlide) {
      case 0: // Title Slide
        return (
          <Slide isPresentation={isPresentation}>
            <div className="flex flex-col items-center justify-center h-full text-center">
              {/* Glowing animated icon */}
              <div className="relative mb-8">
                <div className={`absolute inset-0 bg-cyan-500 blur-[100px] opacity-20 rounded-full animate-pulse`}></div>
                <Users size={isPresentation ? 120 : 80} className="text-cyan-400 relative z-10" />
              </div>
              <h1 className={`font-bold text-white mb-4 tracking-widest uppercase ${isPresentation ? 'text-7xl' : 'text-5xl'}`}>
                Conformity
              </h1>
              <div className="h-1 w-64 bg-cyan-900 my-6"></div>
              <h2 className="text-cyan-600 text-xs tracking-[0.5em] uppercase mb-8 font-bold">
                Asch's Classic Study of Group Influence
              </h2>
              <p className={`text-gray-400 max-w-xl leading-relaxed ${isPresentation ? 'text-xl' : 'text-base'}`}>
                Explore how individuals change their behaviour to match the responses of others
              </p>
            </div>
          </Slide>
        );

      case 1: // Do Now
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 1: Activation"
              title="Do Now: Prior Knowledge"
              icon={ClipboardList}
              time="5 min"
              isPresentation={isPresentation}
            />
            <DoNowQuiz questions={lesson1DoNow} isPresentation={isPresentation} />
          </Slide>
        );

      case 2: // Concept1
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 2: Concept"
              title="Asch's Procedure & Findings"
              icon={Brain}
              time="8 min"
              isPresentation={isPresentation}
            />
            <Lesson1Concept1 isPresentation={isPresentation} />
          </Slide>
        );

      case 3: // Concept2
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 2: Concept"
              title="Social Factors in Conformity"
              icon={Lightbulb}
              time="8 min"
              isPresentation={isPresentation}
            />
            <Lesson1Concept2 isPresentation={isPresentation} />
          </Slide>
        );

      case 4: // UnderstandingCheck
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 2: Check"
              title="Understanding Check"
              icon={CheckSquare}
              time="10 min"
              isPresentation={isPresentation}
            />
            <UnderstandingCheck
              questions={lesson1UnderstandingCheck}
              themeColor={themeColor}
              isPresentation={isPresentation}
            />
          </Slide>
        );

      case 5: // Simulation
        return (
          <Slide isPresentation={isPresentation}>
            <Lesson1Simulation isPresentation={isPresentation} />
          </Slide>
        );

      case 6: // Evidence
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 4: Evidence"
              title="Supporting Research"
              icon={BookOpen}
              time="8 min"
              isPresentation={isPresentation}
            />
            <Lesson1EvidenceGrid isPresentation={isPresentation} />
          </Slide>
        );

      case 7: // Evaluation
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 5: Evaluation"
              title="Strengths, Limitations & Alternatives"
              icon={Scale}
              time="8 min"
              isPresentation={isPresentation}
            />
            <Lesson1CritiqueGrid isPresentation={isPresentation} />
          </Slide>
        );

      case 8: // Assessment
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 6: Assessment"
              title="Essay Plan: 8-Mark Structure"
              icon={PenTool}
              time="7 min"
              isPresentation={isPresentation}
            />
            <Lesson1EssayPlan isPresentation={isPresentation} />
          </Slide>
        );

      case 9: // Completion
        return (
          <Slide isPresentation={isPresentation}>
            <div className={`flex flex-col items-center justify-center h-full gap-8`}>
              <div className="relative">
                <div className={`absolute inset-0 bg-${themeColor}-500 blur-[80px] opacity-20 rounded-full animate-pulse`}></div>
                <div className={`text-7xl relative z-10`}>✅</div>
              </div>
              <div className="text-center max-w-2xl">
                <h2 className={`text-4xl font-bold text-${themeColor}-400 mb-6 tracking-wide`}>
                  Lesson Complete!
                </h2>
                <div className={`bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg`}>
                  <div className={`text-lg text-gray-300 space-y-3`}>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Asch's procedure & findings</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Social factors: Group size, Anonymity, Task difficulty</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> NSI vs ISI distinction</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Research evaluation framework</p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        );

      default:
        return null;
    }
  };

  const renderLesson2 = () => {
    switch (currentSlide) {
      case 0: // Title Slide
        return (
          <Slide isPresentation={isPresentation}>
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="relative mb-8">
                <div className={`absolute inset-0 bg-amber-500 blur-[100px] opacity-20 rounded-full animate-pulse`}></div>
                <Zap size={isPresentation ? 120 : 80} className="text-amber-400 relative z-10" />
              </div>
              <h1 className={`font-bold text-white mb-4 tracking-widest uppercase ${isPresentation ? 'text-7xl' : 'text-5xl'}`}>
                Obedience
              </h1>
              <div className="h-1 w-64 bg-amber-900 my-6"></div>
              <h2 className="text-amber-600 text-xs tracking-[0.5em] uppercase mb-8 font-bold">
                Milgram's Study of Destructive Obedience
              </h2>
              <p className={`text-gray-400 max-w-xl leading-relaxed ${isPresentation ? 'text-xl' : 'text-base'}`}>
                Understanding why ordinary people follow orders that harm others
              </p>
            </div>
          </Slide>
        );

      case 1: // Do Now
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 1: Activation"
              title="Do Now: Prior Knowledge"
              icon={ClipboardList}
              time="3 min"
              isPresentation={isPresentation}
              color="amber"
            />
            <Lesson2DoNow isPresentation={isPresentation} />
          </Slide>
        );

      case 2: // Milgram's Study
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 2: Teacher Input"
              title="Milgram's Study (1963)"
              icon={FlaskConical}
              time="8 min"
              isPresentation={isPresentation}
              color="amber"
            />
            <Lesson2MilgramStudy isPresentation={isPresentation} />
          </Slide>
        );

      case 3: // Situational Factors
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 2: Teacher Input"
              title="Situational Factors"
              icon={MapPin}
              time="8 min"
              isPresentation={isPresentation}
              color="amber"
            />
            <Lesson2SituationalFactors isPresentation={isPresentation} />
          </Slide>
        );

      case 4: // Knowledge Check
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 3: AFL"
              title="Knowledge Check"
              icon={CheckSquare}
              time="5 min"
              isPresentation={isPresentation}
              color="amber"
            />
            <Lesson2KnowledgeCheck isPresentation={isPresentation} />
          </Slide>
        );

      case 5: // Agency Theory
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 2: Teacher Input"
              title="Agency Theory"
              icon={UserCog}
              time="8 min"
              isPresentation={isPresentation}
              color="amber"
            />
            <Lesson2AgencyTheory isPresentation={isPresentation} />
          </Slide>
        );

      case 6: // Simulation
        return (
          <Slide isPresentation={isPresentation}>
            <Lesson2Simulation isPresentation={isPresentation} />
          </Slide>
        );

      case 7: // Evaluation
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 5: Evaluation"
              title="Evaluating Milgram"
              icon={Scale}
              time="8 min"
              isPresentation={isPresentation}
              color="amber"
            />
            <Lesson2Evaluation isPresentation={isPresentation} />
          </Slide>
        );

      case 8: // Essay Plan
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 6: Assessment"
              title="Essay Plan: 8-Mark Structure"
              icon={FileText}
              time="7 min"
              isPresentation={isPresentation}
              color="amber"
            />
            <Lesson2EssayPlan isPresentation={isPresentation} />
          </Slide>
        );

      case 9: // Completion
        return (
          <Slide isPresentation={isPresentation}>
            <div className={`flex flex-col items-center justify-center h-full gap-8`}>
              <div className="relative">
                <div className={`absolute inset-0 bg-amber-500 blur-[80px] opacity-20 rounded-full animate-pulse`}></div>
                <div className={`text-7xl relative z-10`}>✅</div>
              </div>
              <div className="text-center max-w-2xl">
                <h2 className={`text-4xl font-bold text-amber-400 mb-6 tracking-wide`}>
                  Lesson Complete!
                </h2>
                <div className={`bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg`}>
                  <div className={`text-lg text-gray-300 space-y-3`}>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Milgram's procedure, results & conclusions</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Situational factors: Proximity, Location, Uniform</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Agency Theory: Agentic state & moral strain</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Evaluation: Ethics, validity, real-world support</p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        );

      default:
        return null;
    }
  };

  const renderLesson3 = () => {
    switch (currentSlide) {
      case 0: // Title Slide
        return (
          <Slide isPresentation={isPresentation}>
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="relative mb-8">
                <div className={`absolute inset-0 bg-orange-500 blur-[100px] opacity-20 rounded-full animate-pulse`}></div>
                <Brain size={isPresentation ? 120 : 80} className="text-orange-400 relative z-10" />
              </div>
              <h1 className={`font-bold text-white mb-4 tracking-widest uppercase ${isPresentation ? 'text-7xl' : 'text-5xl'}`}>
                Resistance
              </h1>
              <div className="h-1 w-64 bg-orange-900 my-6"></div>
              <h2 className="text-orange-600 text-xs tracking-[0.5em] uppercase mb-8 font-bold">
                Dispositional Factors & The Authoritarian Personality
              </h2>
              <p className={`text-gray-400 max-w-xl leading-relaxed ${isPresentation ? 'text-xl' : 'text-base'}`}>
                Understanding why some individuals resist conformity and obedience while others comply
              </p>
            </div>
          </Slide>
        );

      case 1: // Do Now
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 1: Activation"
              title="Do Now: Prior Knowledge"
              icon={ClipboardList}
              time="3 min"
              isPresentation={isPresentation}
              color="orange"
            />
            <Lesson3DoNow isPresentation={isPresentation} />
          </Slide>
        );

      case 2: // Dispositional Factors
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 2: Teacher Input"
              title="Dispositional Factors"
              icon={Lightbulb}
              time="8 min"
              isPresentation={isPresentation}
              color="orange"
            />
            <Lesson3Dispositional isPresentation={isPresentation} />
          </Slide>
        );

      case 3: // Authoritarian Personality
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 2: Teacher Input"
              title="Authoritarian Personality"
              icon={UserCog}
              time="8 min"
              isPresentation={isPresentation}
              color="orange"
            />
            <Lesson3AuthoritarianPersonality isPresentation={isPresentation} />
          </Slide>
        );

      case 4: // Knowledge Check
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 3: AFL"
              title="Knowledge Check"
              icon={CheckSquare}
              time="5 min"
              isPresentation={isPresentation}
              color="orange"
            />
            <Lesson3KnowledgeCheck isPresentation={isPresentation} />
          </Slide>
        );

      case 5: // Simulation
        return (
          <Slide isPresentation={isPresentation}>
            <Lesson3Simulation isPresentation={isPresentation} />
          </Slide>
        );

      case 6: // Evidence / Evaluation
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 5: Evaluation"
              title="Evaluating Dispositional Explanations"
              icon={Scale}
              time="8 min"
              isPresentation={isPresentation}
              color="orange"
            />
            <Lesson3Evaluation isPresentation={isPresentation} />
          </Slide>
        );

      case 7: // Essay Plan
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader
              phase="Phase 6: Assessment"
              title="Essay Plan: 8-Mark Structure"
              icon={FileText}
              time="7 min"
              isPresentation={isPresentation}
              color="orange"
            />
            <Lesson3EssayPlan isPresentation={isPresentation} />
          </Slide>
        );

      case 8: // Summary
        return (
          <Slide isPresentation={isPresentation}>
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <div className="relative">
                <div className={`absolute inset-0 bg-orange-500 blur-[80px] opacity-20 rounded-full animate-pulse`}></div>
                <div className="text-7xl relative z-10">📋</div>
              </div>
              <div className="text-center max-w-2xl">
                <h2 className="text-4xl font-bold text-orange-400 mb-6 tracking-wide">
                  Key Takeaways
                </h2>
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                  <div className="text-lg text-gray-300 space-y-3">
                    <p className="flex items-center gap-3"><span className="text-orange-400 font-bold">LOC:</span> Internal = resist, External = conform</p>
                    <p className="flex items-center gap-3"><span className="text-orange-400 font-bold">Expertise:</span> Experts resist ISI in their domain</p>
                    <p className="flex items-center gap-3"><span className="text-orange-400 font-bold">Auth. Personality:</span> Harsh parenting → obedience</p>
                    <p className="flex items-center gap-3"><span className="text-orange-400 font-bold">Key debate:</span> Dispositional vs Situational factors</p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        );

      case 9: // Completion
        return (
          <Slide isPresentation={isPresentation}>
            <div className={`flex flex-col items-center justify-center h-full gap-8`}>
              <div className="relative">
                <div className={`absolute inset-0 bg-orange-500 blur-[80px] opacity-20 rounded-full animate-pulse`}></div>
                <div className={`text-7xl relative z-10`}>✅</div>
              </div>
              <div className="text-center max-w-2xl">
                <h2 className={`text-4xl font-bold text-orange-400 mb-6 tracking-wide`}>
                  Lesson Complete!
                </h2>
                <div className={`bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg`}>
                  <div className={`text-lg text-gray-300 space-y-3`}>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Dispositional factors: LOC & Expertise</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Authoritarian personality: Adorno et al.</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Evaluation: Research support & limitations</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Essay planning: AO1 + AO3 with named evidence</p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        );

      default:
        return null;
    }
  };

  const renderLesson4 = () => {
    switch (currentSlide) {
      case 0:
        return (
          <Slide isPresentation={isPresentation}>
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="relative mb-8">
                <div className={`absolute inset-0 bg-red-500 blur-[100px] opacity-20 rounded-full animate-pulse`}></div>
                <Users size={isPresentation ? 120 : 80} className="text-red-400 relative z-10" />
              </div>
              <h1 className={`font-bold text-white mb-4 tracking-widest uppercase ${isPresentation ? 'text-7xl' : 'text-5xl'}`}>Minority Influence</h1>
              <div className="h-1 w-64 bg-red-900 my-6"></div>
              <h2 className="text-red-600 text-xs tracking-[0.5em] uppercase mb-8 font-bold">Moscovici's Blue Slide Study</h2>
              <p className={`text-gray-400 max-w-xl leading-relaxed ${isPresentation ? 'text-xl' : 'text-base'}`}>How a consistent minority can change the views of the majority</p>
            </div>
          </Slide>
        );
      case 1:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 1: Activation" title="Do Now: Prior Knowledge" icon={ClipboardList} time="3 min" isPresentation={isPresentation} color="red" />
            <Lesson4DoNow isPresentation={isPresentation} />
          </Slide>
        );
      case 2:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 2: Teacher Input" title="Moscovici's Study (1969)" icon={FlaskConical} time="8 min" isPresentation={isPresentation} color="red" />
            <Lesson4MoscoviciStudy isPresentation={isPresentation} />
          </Slide>
        );
      case 3:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 2: Teacher Input" title="Factors in Minority Influence" icon={Lightbulb} time="8 min" isPresentation={isPresentation} color="red" />
            <Lesson4MinorityFactors isPresentation={isPresentation} />
          </Slide>
        );
      case 4:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 3: AFL" title="Knowledge Check" icon={CheckSquare} time="5 min" isPresentation={isPresentation} color="red" />
            <Lesson4KnowledgeCheck isPresentation={isPresentation} />
          </Slide>
        );
      case 5:
        return (
          <Slide isPresentation={isPresentation}>
            <Lesson4Simulation isPresentation={isPresentation} />
          </Slide>
        );
      case 6:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 5: Evaluation" title="Evaluating Minority Influence" icon={Scale} time="8 min" isPresentation={isPresentation} color="red" />
            <Lesson4Evaluation isPresentation={isPresentation} />
          </Slide>
        );
      case 7:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 6: Assessment" title="Essay Plan: 8-Mark Structure" icon={FileText} time="7 min" isPresentation={isPresentation} color="red" />
            <Lesson4EssayPlan isPresentation={isPresentation} />
          </Slide>
        );
      case 8:
        return (
          <Slide isPresentation={isPresentation}>
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <div className="relative"><div className="absolute inset-0 bg-red-500 blur-[80px] opacity-20 rounded-full animate-pulse"></div><div className="text-7xl relative z-10">📋</div></div>
              <div className="text-center max-w-2xl">
                <h2 className="text-4xl font-bold text-red-400 mb-6 tracking-wide">Key Takeaways</h2>
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                  <div className="text-lg text-gray-300 space-y-3">
                    <p className="flex items-center gap-3"><span className="text-red-400 font-bold">Moscovici:</span> Consistent minority = 8.42% influence</p>
                    <p className="flex items-center gap-3"><span className="text-red-400 font-bold">Factors:</span> Consistency, commitment, flexibility</p>
                    <p className="flex items-center gap-3"><span className="text-red-400 font-bold">Process:</span> Conversion through private re-evaluation</p>
                    <p className="flex items-center gap-3"><span className="text-red-400 font-bold">Debate:</span> Lab vs real-world minority influence</p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        );
      case 9:
        return (
          <Slide isPresentation={isPresentation}>
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <div className="relative"><div className="absolute inset-0 bg-red-500 blur-[80px] opacity-20 rounded-full animate-pulse"></div><div className="text-7xl relative z-10">✅</div></div>
              <div className="text-center max-w-2xl">
                <h2 className="text-4xl font-bold text-red-400 mb-6 tracking-wide">Lesson Complete!</h2>
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                  <div className="text-lg text-gray-300 space-y-3">
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Moscovici's blue slide study</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Factors: Consistency, commitment, flexibility</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Evaluation: Research support & limitations</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Essay planning: AO1 + AO3 with named evidence</p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        );
      default:
        return null;
    }
  };

  const renderLesson5 = () => {
    switch (currentSlide) {
      case 0:
        return (
          <Slide isPresentation={isPresentation}>
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="relative mb-8">
                <div className={`absolute inset-0 bg-yellow-500 blur-[100px] opacity-20 rounded-full animate-pulse`}></div>
                <Users size={isPresentation ? 120 : 80} className="text-yellow-400 relative z-10" />
              </div>
              <h1 className={`font-bold text-white mb-4 tracking-widest uppercase ${isPresentation ? 'text-7xl' : 'text-5xl'}`}>Crowd Behaviour</h1>
              <div className="h-1 w-64 bg-yellow-900 my-6"></div>
              <h2 className="text-yellow-600 text-xs tracking-[0.5em] uppercase mb-8 font-bold">Deindividuation & Collective Action</h2>
              <p className={`text-gray-400 max-w-xl leading-relaxed ${isPresentation ? 'text-xl' : 'text-base'}`}>Understanding how individuals change when they become part of a crowd</p>
            </div>
          </Slide>
        );
      case 1:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 1: Activation" title="Do Now: Prior Knowledge" icon={ClipboardList} time="3 min" isPresentation={isPresentation} color="yellow" />
            <Lesson5DoNow isPresentation={isPresentation} />
          </Slide>
        );
      case 2:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 2: Teacher Input" title="Deindividuation" icon={Brain} time="8 min" isPresentation={isPresentation} color="yellow" />
            <Lesson5Deindividuation isPresentation={isPresentation} />
          </Slide>
        );
      case 3:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 2: Teacher Input" title="Reicher's St Pauls Study (1984)" icon={FlaskConical} time="8 min" isPresentation={isPresentation} color="yellow" />
            <Lesson5ReicherStudy isPresentation={isPresentation} />
          </Slide>
        );
      case 4:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 3: AFL" title="Knowledge Check" icon={CheckSquare} time="5 min" isPresentation={isPresentation} color="yellow" />
            <Lesson5KnowledgeCheck isPresentation={isPresentation} />
          </Slide>
        );
      case 5:
        return (
          <Slide isPresentation={isPresentation}>
            <Lesson5Simulation isPresentation={isPresentation} />
          </Slide>
        );
      case 6:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 5: Evaluation" title="Evaluating Crowd Explanations" icon={Scale} time="8 min" isPresentation={isPresentation} color="yellow" />
            <Lesson5Evaluation isPresentation={isPresentation} />
          </Slide>
        );
      case 7:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 6: Assessment" title="Essay Plan: 8-Mark Structure" icon={FileText} time="7 min" isPresentation={isPresentation} color="yellow" />
            <Lesson5EssayPlan isPresentation={isPresentation} />
          </Slide>
        );
      case 8:
        return (
          <Slide isPresentation={isPresentation}>
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <div className="relative"><div className="absolute inset-0 bg-yellow-500 blur-[80px] opacity-20 rounded-full animate-pulse"></div><div className="text-7xl relative z-10">📋</div></div>
              <div className="text-center max-w-2xl">
                <h2 className="text-4xl font-bold text-yellow-400 mb-6 tracking-wide">Key Takeaways</h2>
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                  <div className="text-lg text-gray-300 space-y-3">
                    <p className="flex items-center gap-3"><span className="text-yellow-400 font-bold">Deindividuation:</span> Lost identity → reduced responsibility</p>
                    <p className="flex items-center gap-3"><span className="text-yellow-400 font-bold">Zimbardo:</span> Hoods = more shocking behaviour</p>
                    <p className="flex items-center gap-3"><span className="text-yellow-400 font-bold">Reicher:</span> Crowd behaviour is selective, not random</p>
                    <p className="flex items-center gap-3"><span className="text-yellow-400 font-bold">Debate:</span> Deindividuation vs Social Identity Theory</p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        );
      case 9:
        return (
          <Slide isPresentation={isPresentation}>
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <div className="relative"><div className="absolute inset-0 bg-yellow-500 blur-[80px] opacity-20 rounded-full animate-pulse"></div><div className="text-7xl relative z-10">✅</div></div>
              <div className="text-center max-w-2xl">
                <h2 className="text-4xl font-bold text-yellow-400 mb-6 tracking-wide">Lesson Complete!</h2>
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                  <div className="text-lg text-gray-300 space-y-3">
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Deindividuation: Zimbardo (1969)</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Reicher's St Pauls study (1984)</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Evaluation: Support & alternative explanations</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Essay planning: AO1 + AO3 with named evidence</p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        );
      default:
        return null;
    }
  };

  const renderLesson6 = () => {
    switch (currentSlide) {
      case 0:
        return (
          <Slide isPresentation={isPresentation}>
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="relative mb-8">
                <div className={`absolute inset-0 bg-teal-500 blur-[100px] opacity-20 rounded-full animate-pulse`}></div>
                <Users size={isPresentation ? 120 : 80} className="text-teal-400 relative z-10" />
              </div>
              <h1 className={`font-bold text-white mb-4 tracking-widest uppercase ${isPresentation ? 'text-7xl' : 'text-5xl'}`}>Crowd Factors</h1>
              <div className="h-1 w-64 bg-teal-900 my-6"></div>
              <h2 className="text-teal-600 text-xs tracking-[0.5em] uppercase mb-8 font-bold">Social Loafing, Culture, Personality & Morality</h2>
              <p className={`text-gray-400 max-w-xl leading-relaxed ${isPresentation ? 'text-xl' : 'text-base'}`}>Exploring the social and dispositional factors that affect crowd behaviour</p>
            </div>
          </Slide>
        );
      case 1:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 1: Activation" title="Do Now: Prior Knowledge" icon={ClipboardList} time="3 min" isPresentation={isPresentation} color="teal" />
            <Lesson6DoNow isPresentation={isPresentation} />
          </Slide>
        );
      case 2:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 2: Teacher Input" title="Social Factors" icon={Users} time="8 min" isPresentation={isPresentation} color="teal" />
            <Lesson6SocialFactors isPresentation={isPresentation} />
          </Slide>
        );
      case 3:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 2: Teacher Input" title="Dispositional Factors" icon={Brain} time="8 min" isPresentation={isPresentation} color="teal" />
            <Lesson6DispositionalFactors isPresentation={isPresentation} />
          </Slide>
        );
      case 4:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 3: AFL" title="Knowledge Check" icon={CheckSquare} time="5 min" isPresentation={isPresentation} color="teal" />
            <Lesson6KnowledgeCheck isPresentation={isPresentation} />
          </Slide>
        );
      case 5:
        return (
          <Slide isPresentation={isPresentation}>
            <Lesson6Simulation isPresentation={isPresentation} />
          </Slide>
        );
      case 6:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 5: Evaluation" title="Evaluating Crowd Factors" icon={Scale} time="8 min" isPresentation={isPresentation} color="teal" />
            <Lesson6Evaluation isPresentation={isPresentation} />
          </Slide>
        );
      case 7:
        return (
          <Slide isPresentation={isPresentation}>
            <PhaseHeader phase="Phase 6: Assessment" title="Essay Plan: 8-Mark Structure" icon={FileText} time="7 min" isPresentation={isPresentation} color="teal" />
            <Lesson6EssayPlan isPresentation={isPresentation} />
          </Slide>
        );
      case 8:
        return (
          <Slide isPresentation={isPresentation}>
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <div className="relative"><div className="absolute inset-0 bg-teal-500 blur-[80px] opacity-20 rounded-full animate-pulse"></div><div className="text-7xl relative z-10">📋</div></div>
              <div className="text-center max-w-2xl">
                <h2 className="text-4xl font-bold text-teal-400 mb-6 tracking-wide">Key Takeaways</h2>
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                  <div className="text-lg text-gray-300 space-y-3">
                    <p className="flex items-center gap-3"><span className="text-teal-400 font-bold">Social Loafing:</span> Less effort in groups (Ringelmann)</p>
                    <p className="flex items-center gap-3"><span className="text-teal-400 font-bold">Culture:</span> Collectivist vs individualist patterns</p>
                    <p className="flex items-center gap-3"><span className="text-teal-400 font-bold">Personality:</span> Self-esteem, LOC, sensation-seeking</p>
                    <p className="flex items-center gap-3"><span className="text-teal-400 font-bold">Morality:</span> Personal values as a brake on crowd behaviour</p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        );
      case 9:
        return (
          <Slide isPresentation={isPresentation}>
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <div className="relative"><div className="absolute inset-0 bg-teal-500 blur-[80px] opacity-20 rounded-full animate-pulse"></div><div className="text-7xl relative z-10">✅</div></div>
              <div className="text-center max-w-2xl">
                <h2 className="text-4xl font-bold text-teal-400 mb-6 tracking-wide">Lesson Complete!</h2>
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                  <div className="text-lg text-gray-300 space-y-3">
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Social loafing: Ringelmann & Shaw</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Cultural influences on crowd behaviour</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Personality & morality as dispositional factors</p>
                    <p className="flex items-center gap-3"><span className="text-green-400">✓</span> Essay planning: AO1 + AO3 with named evidence</p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        );
      default:
        return null;
    }
  };

  const renderCurrentLesson = () => {
    switch (currentLesson) {
      case 1:
        return renderLesson1();
      case 2:
        return renderLesson2();
      case 3:
        return renderLesson3();
      case 4:
        return renderLesson4();
      case 5:
        return renderLesson5();
      case 6:
        return renderLesson6();
      default:
        return renderLesson1();
    }
  };

  return (
    <div className="flex h-screen bg-black text-gray-100">
      {/* Sidebar - hidden in presentation mode */}
      {!isPresentation && (
        <div
          className={`${
            sidebarOpen ? 'w-48' : 'w-0'
          } transition-all duration-300 bg-gray-900 border-r border-gray-800 overflow-hidden flex flex-col`}
        >
        <div className="px-3 py-2 border-b border-gray-800">
          <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">GCSE Psychology</h2>
          <h3 className="text-sm font-bold text-white mt-1">Social Influence</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {[1, 2, 3, 4, 5, 6].map(lesson => {
            const theme = lessonThemes.find(t => t.lesson === lesson);
            const lessonNames: Record<number, string> = {
              1: 'Conformity',
              2: 'Obedience',
              3: 'Dispositional Factors',
              4: 'Minority Influence',
              5: 'Crowd Behaviour',
              6: 'Crowd Factors'
            };
            return (
              <button
                key={lesson}
                onClick={() => setCurrentLesson(lesson)}
                className={`w-full text-left px-2 py-1.5 rounded-lg transition-all text-xs ${
                  currentLesson === lesson
                    ? `bg-${theme?.color}-500/20 border border-${theme?.color}-500/50 text-${theme?.color}-400`
                    : `bg-gray-800/50 hover:bg-gray-800 border border-transparent text-gray-300`
                }`}
              >
                <div className="font-semibold text-xs">Lesson {lesson}</div>
                <div className="text-[10px] text-gray-400">{lessonNames[lesson]}</div>
              </button>
            );
          })}
        </div>
      </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Control Bar - hidden in presentation mode */}
        {!isPresentation && (
        <div className="bg-gray-900 border-b border-gray-800 px-3 py-1.5 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-800 rounded-lg transition"
          >
            {sidebarOpen ? (
              <Menu size={16} className="text-gray-400" />
            ) : (
              <X size={16} className="text-gray-400" />
            )}
          </button>

          <div className="flex-1 text-center">
            <div className={`text-xs font-semibold text-${themeColor}-400`}>
              Lesson {currentLesson} • Slide {currentSlide + 1} / 10
            </div>
          </div>

          <button
            onClick={togglePresentation}
            className="p-1 hover:bg-gray-800 rounded-lg transition"
          >
            {isPresentation ? (
              <Minimize2 size={16} className="text-gray-400" />
            ) : (
              <Maximize2 size={16} className="text-gray-400" />
            )}
          </button>
        </div>
        )}

        {/* Slide Content */}
        <div className="flex-1 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          {renderCurrentLesson()}
        </div>

        {/* Navigation Bar - simplified in presentation mode */}
        {isPresentation ? (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-900/90 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-700 shadow-lg">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-1 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition"
            >
              <ChevronLeft size={20} className={currentSlide === 0 ? 'text-gray-600' : 'text-cyan-400'} />
            </button>
            <span className="text-gray-400 text-sm font-mono">{currentSlide + 1} / 10</span>
            <button
              onClick={nextSlide}
              disabled={currentSlide === 9}
              className="p-1 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition"
            >
              <ChevronRight size={20} className={currentSlide === 9 ? 'text-gray-600' : 'text-cyan-400'} />
            </button>
            <button
              onClick={togglePresentation}
              className="p-1 hover:bg-gray-800 rounded-full transition ml-2"
            >
              <Minimize2 size={18} className="text-gray-400" />
            </button>
          </div>
        ) : (
          <div className="bg-gray-900 border-t border-gray-800 px-3 py-1.5 flex items-center justify-between">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-1 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
            >
              <ChevronLeft size={18} className={`${currentSlide === 0 ? 'text-gray-600' : `text-${themeColor}-400`}`} />
            </button>

            <div className="flex gap-1.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentSlide
                      ? `bg-${themeColor}-500 w-6`
                      : `bg-gray-700 hover:bg-gray-600`
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === 9}
              className="p-1 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
            >
              <ChevronRight size={18} className={`${currentSlide === 9 ? 'text-gray-600' : `text-${themeColor}-400`}`} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

