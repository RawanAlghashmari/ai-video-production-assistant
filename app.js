// Application State
const app = {
    currentPage: 'landing',
    formData: {
        videoType: null,
        videoGoal: null,
        targetPlatform: null,
        videoDuration: null,
        experienceLevel: null,
        budget: null,
        productionNeeds: []
    },

    // Tool database
    tools: {
        Script: {
            'ChatGPT': {
                category: 'Script',
                description: 'Advanced AI writing for scripts, prompts, and narrative structure',
                why: 'Excellent for crafting compelling narratives and dialogue'
            },
            'Claude': {
                category: 'Script',
                description: 'Deep reasoning AI for complex storytelling and creative direction',
                why: 'Great for structured, thoughtful script development'
            }
        },
        Images: {
            'Midjourney': {
                category: 'Images',
                description: 'Premium AI image generation with artistic control',
                why: 'Best for high-quality, stylized imagery'
            },
            'Leonardo AI': {
                category: 'Images',
                description: 'Fast, affordable AI image generation',
                why: 'Good balance of quality and speed'
            }
        },
        'Video Generation': {
            'Veo 3.1': {
                category: 'Video Generation',
                description: 'Native audio generation, flexible multi-scene',
                why: 'Ideal when audio integration is important'
            },
            'Seedance 2.0': {
                category: 'Video Generation',
                description: 'Multi-reference and multi-shot workflows',
                why: 'Good for complex, multi-scene productions'
            },
            'Runway Gen-4.5': {
                category: 'Video Generation',
                description: 'Advanced motion control and scene composition',
                why: 'Best for Intermediate users needing fine control'
            },
            'Luma Ray 3.2': {
                category: 'Video Generation',
                description: 'Video transformation and continuity workflows',
                why: 'Excellent for video-to-video and continuity work'
            }
        },
        Voice: {
            'ElevenLabs': {
                category: 'Voice',
                description: 'Premium voice synthesis with multiple languages',
                why: 'Highest quality voice output'
            },
            'CapCut Voice': {
                category: 'Voice',
                description: 'Fast, integrated voice generation in editing',
                why: 'Convenient for quick voiceover workflows'
            }
        },
        Music: {
            'Suno': {
                category: 'Music',
                description: 'AI music generation with lyrical composition',
                why: 'Great for original music with lyrics'
            },
            'Udio': {
                category: 'Music',
                description: 'Fast AI music generation',
                why: 'Quick, versatile music creation'
            }
        },
        Editing: {
            'CapCut': {
                category: 'Editing',
                description: 'Fast, intuitive editing with integrated effects',
                why: 'Beginner-friendly with powerful tools'
            },
            'Descript': {
                category: 'Editing',
                description: 'Text-based editing and transcription-driven workflow',
                why: 'Ideal for rapid editing and refinement'
            }
        }
    },

    // Navigation
    navigateTo(page) {
        this.currentPage = page;
        this.render();
    },

    // Form handlers
    setFormValue(field, value) {
        if (field === 'productionNeeds') {
            const index = this.formData.productionNeeds.indexOf(value);
            if (index > -1) {
                this.formData.productionNeeds.splice(index, 1);
            } else {
                this.formData.productionNeeds.push(value);
            }
        } else {
            this.formData[field] = value;
        }
        this.render();
    },

    // Validation
    isFormValid() {
        return (
            this.formData.videoType &&
            this.formData.videoGoal &&
            this.formData.targetPlatform &&
            this.formData.videoDuration &&
            this.formData.experienceLevel &&
            this.formData.budget &&
            this.formData.productionNeeds.length > 0
        );
    },

    // Recommendation Engine
    getRecommendations() {
        const recommendations = {};
        const selectedNeeds = this.formData.productionNeeds;

        selectedNeeds.forEach(need => {
            if (this.tools[need]) {
                const toolsForCategory = this.tools[need];
                const recommended = this.rankTools(need, toolsForCategory);
                recommendations[need] = recommended;
            }
        });

        return recommendations;
    },

    rankTools(category, toolsForCategory) {
        const tools = Object.entries(toolsForCategory).map(([name, data]) => ({
            name,
            ...data
        }));

        // Ranking rules based on priority
        const { videoType, videoGoal, targetPlatform, videoDuration, experienceLevel, budget } = this.formData;

        return tools.sort((a, b) => {
            let scoreA = 0;
            let scoreB = 0;

            // Budget filtering and scoring
            if (budget === 'Free') {
                // Prefer free options, mark paid as requiring access
                const freeTools = ['Claude', 'CapCut', 'CapCut Voice', 'Suno', 'Udio'];
                scoreA += freeTools.includes(a.name) ? 100 : -50;
                scoreB += freeTools.includes(b.name) ? 100 : -50;
            } else if (budget === 'Low') {
                const lowCostTools = ['Leonardo AI', 'CapCut', 'Suno'];
                scoreA += lowCostTools.includes(a.name) ? 50 : 0;
                scoreB += lowCostTools.includes(b.name) ? 50 : 0;
            }

            // Experience level scoring
            if (experienceLevel === 'Beginner') {
                const beginnerTools = ['CapCut', 'ChatGPT', 'Midjourney'];
                scoreA += beginnerTools.includes(a.name) ? 30 : 0;
                scoreB += beginnerTools.includes(b.name) ? 30 : 0;
            } else {
                const intermediateTools = ['Runway Gen-4.5', 'Claude', 'Descript'];
                scoreA += intermediateTools.includes(a.name) ? 30 : 0;
                scoreB += intermediateTools.includes(b.name) ? 30 : 0;
            }

            // Platform-specific scoring
            if (targetPlatform === 'TikTok' || targetPlatform === 'Instagram') {
                const shortFormTools = ['CapCut', 'Luma Ray 3.2'];
                scoreA += shortFormTools.includes(a.name) ? 25 : 0;
                scoreB += shortFormTools.includes(b.name) ? 25 : 0;
            }

            if (targetPlatform === 'YouTube') {
                const longFormTools = ['Descript', 'Runway Gen-4.5'];
                scoreA += longFormTools.includes(a.name) ? 25 : 0;
                scoreB += longFormTools.includes(b.name) ? 25 : 0;
            }

            // Video duration scoring
            if (videoDuration === 'Long') {
                const longDurationTools = ['Descript', 'Runway Gen-4.5'];
                scoreA += longDurationTools.includes(a.name) ? 20 : 0;
                scoreB += longDurationTools.includes(b.name) ? 20 : 0;
            }

            // Category-specific scoring
            if (category === 'Video Generation') {
                if (videoDuration === 'Short') {
                    scoreA += a.name === 'Veo 3.1' ? 40 : 0;
                    scoreB += b.name === 'Veo 3.1' ? 40 : 0;
                } else if (videoDuration === 'Long') {
                    scoreA += a.name === 'Runway Gen-4.5' ? 40 : 0;
                    scoreB += b.name === 'Runway Gen-4.5' ? 40 : 0;
                }
            }

            return scoreB - scoreA;
        });
    },

    // Reset form
    resetForm() {
        this.formData = {
            videoType: null,
            videoGoal: null,
            targetPlatform: null,
            videoDuration: null,
            experienceLevel: null,
            budget: null,
            productionNeeds: []
        };
        this.navigateTo('landing');
    },

    // Render methods
    render() {
        const app = document.getElementById('app');
        app.innerHTML = '';

        switch (this.currentPage) {
            case 'landing':
                app.appendChild(this.renderLanding());
                break;
            case 'requirements':
                app.appendChild(this.renderRequirements());
                break;
            case 'results':
                app.appendChild(this.renderResults());
                break;
        }
    },

    createFooter() {
        const footer = document.createElement('footer');
        footer.className = 'footer';
        footer.innerHTML = `
            <div class="footer-text">
                © 2026 Rawan Alghashmari. All rights reserved.
                <a href="https://linktr.ee/Rawanalghashmari" class="footer-link" target="_blank" rel="noopener noreferrer" title="Portfolio">🔗</a>
            </div>
        `;
        return footer;
    },

    renderLanding() {
        const container = document.createElement('div');
        container.className = 'page-container';

        container.innerHTML = `
            <div class="landing-header">
                <div class="logo-icon">🎬</div>
                <div class="logo-text">
                    <h1>AI Video</h1>
                    <p>Production Assistant</p>
                </div>
            </div>

            <div class="landing-hero">
                <h1>Plan your AI video <span class="gradient-text">workflow faster.</span></h1>
                <p>Tell us what you want to create and get a personalized production plan with tools, workflow guidance, and cost-aware recommendations.</p>
                <p class="mvp-note">
                    MVP developed to demonstrate and support the approved Business Analysis requirements.
                </p>
            </div>

            <div class="landing-decoration">
                <div class="decoration-icon center">🎵</div>
                <div class="decoration-icon cyan">🎬</div>
                <div class="decoration-icon purple">✨</div>
                <div class="decoration-icon orange">💰</div>
                <div class="decoration-icon blue">🔗</div>
            </div>

            <div class="landing-buttons">
                <button class="btn btn-primary" id="startBtn">
                    ✨ Start Planning
                </button>
                <button class="btn btn-secondary" id="sampleBtn">
                    📋 View sample plan →
                </button>
            </div>

            <div class="value-cards">
                <div class="card value-card">
                    <div class="value-card-icon">🎬</div>
                    <h3>Tool Recommendations</h3>
                    <p>Get personalized tool suggestions based on your needs and budget</p>
                </div>
                <div class="card value-card">
                    <div class="value-card-icon">🔗</div>
                    <h3>Workflow Guidance</h3>
                    <p>Step-by-step guidance for your complete production pipeline</p>
                </div>
                <div class="card value-card">
                    <div class="value-card-icon">💰</div>
                    <h3>Budget-aware Alternatives</h3>
                    <p>Explore cost-effective options without compromising quality</p>
                </div>
            </div>
        `;

        container.querySelector('#startBtn').addEventListener('click', () => this.navigateTo('requirements'));
        container.querySelector('#sampleBtn').addEventListener('click', () => {
            // Load sample data
            this.formData = {
                videoType: 'Marketing',
                videoGoal: 'Promote',
                targetPlatform: 'YouTube',
                videoDuration: 'Medium',
                experienceLevel: 'Intermediate',
                budget: 'Flexible',
                productionNeeds: ['Script', 'Images', 'Video Generation', 'Voice', 'Music', 'Editing']
            };
            this.navigateTo('results');
        });

        container.appendChild(this.createFooter());
        return container;
    },

    renderRequirements() {
        const container = document.createElement('div');
        container.className = 'page-container requirements-container';

        const formData = this.formData;

        container.innerHTML = `
            <div class="requirements-header">
                <h2>Create your plan</h2>
                <p>Tell us about your video</p>
            </div>

            <div class="requirements-content">
                <form id="requirementsForm">
                    <div class="form-section">
                        <label class="section-title">Video Type</label>
                        <div class="chip-group" id="videoTypeGroup">
                            <button type="button" class="chip ${formData.videoType === 'Educational' ? 'active' : ''}" data-value="Educational">Educational</button>
                            <button type="button" class="chip ${formData.videoType === 'Marketing' ? 'active' : ''}" data-value="Marketing">Marketing</button>
                            <button type="button" class="chip ${formData.videoType === 'Social Media' ? 'active' : ''}" data-value="Social Media">Social Media</button>
                            <button type="button" class="chip ${formData.videoType === 'Storytelling' ? 'active' : ''}" data-value="Storytelling">Storytelling</button>
                        </div>
                    </div>

                    <div class="form-section">
                        <label class="section-title">Video Goal</label>
                        <div class="chip-group" id="videoGoalGroup">
                            <button type="button" class="chip ${formData.videoGoal === 'Educate' ? 'active' : ''}" data-value="Educate">Educate</button>
                            <button type="button" class="chip ${formData.videoGoal === 'Promote' ? 'active' : ''}" data-value="Promote">Promote</button>
                            <button type="button" class="chip ${formData.videoGoal === 'Engage' ? 'active' : ''}" data-value="Engage">Engage</button>
                            <button type="button" class="chip ${formData.videoGoal === 'Explain' ? 'active' : ''}" data-value="Explain">Explain</button>
                        </div>
                    </div>

                    <div class="form-section">
                        <label class="section-title">Target Platform</label>
                        <div class="chip-group" id="platformGroup">
                            <button type="button" class="chip ${formData.targetPlatform === 'YouTube' ? 'active' : ''}" data-value="YouTube">YouTube</button>
                            <button type="button" class="chip ${formData.targetPlatform === 'TikTok' ? 'active' : ''}" data-value="TikTok">TikTok</button>
                            <button type="button" class="chip ${formData.targetPlatform === 'Instagram' ? 'active' : ''}" data-value="Instagram">Instagram</button>
                            <button type="button" class="chip ${formData.targetPlatform === 'Other' ? 'active' : ''}" data-value="Other">Other</button>
                        </div>
                    </div>

                    <div class="form-section">
                        <label class="section-title">Video Duration</label>
                        <div class="chip-group" id="durationGroup">
                            <button type="button" class="chip ${formData.videoDuration === 'Short' ? 'active' : ''}" data-value="Short">Short</button>
                            <button type="button" class="chip ${formData.videoDuration === 'Medium' ? 'active' : ''}" data-value="Medium">Medium</button>
                            <button type="button" class="chip ${formData.videoDuration === 'Long' ? 'active' : ''}" data-value="Long">Long</button>
                        </div>
                    </div>

                    <div class="form-section">
                        <label class="section-title">Experience Level</label>
                        <div class="chip-group" id="experienceGroup">
                            <button type="button" class="chip ${formData.experienceLevel === 'Beginner' ? 'active' : ''}" data-value="Beginner">Beginner</button>
                            <button type="button" class="chip ${formData.experienceLevel === 'Intermediate' ? 'active' : ''}" data-value="Intermediate">Intermediate</button>
                        </div>
                    </div>

                    <div class="form-section">
                        <label class="section-title">Budget</label>
                        <div class="chip-group" id="budgetGroup">
                            <button type="button" class="chip ${formData.budget === 'Free' ? 'active' : ''}" data-value="Free">Free</button>
                            <button type="button" class="chip ${formData.budget === 'Low' ? 'active' : ''}" data-value="Low">Low</button>
                            <button type="button" class="chip ${formData.budget === 'Flexible' ? 'active' : ''}" data-value="Flexible">Flexible</button>
                        </div>
                    </div>

                    <div class="form-section">
                        <label class="section-title">Production Needs</label>
                        <div class="chip-group" id="needsGroup">
                            <button type="button" class="chip ${formData.productionNeeds.includes('Script') ? 'active' : ''}" data-value="Script">Script</button>
                            <button type="button" class="chip ${formData.productionNeeds.includes('Images') ? 'active' : ''}" data-value="Images">Images</button>
                            <button type="button" class="chip ${formData.productionNeeds.includes('Video Generation') ? 'active' : ''}" data-value="Video Generation">Video Generation</button>
                            <button type="button" class="chip ${formData.productionNeeds.includes('Voice') ? 'active' : ''}" data-value="Voice">Voice</button>
                            <button type="button" class="chip ${formData.productionNeeds.includes('Music') ? 'active' : ''}" data-value="Music">Music</button>
                            <button type="button" class="chip ${formData.productionNeeds.includes('Editing') ? 'active' : ''}" data-value="Editing">Editing</button>
                        </div>
                    </div>
                </form>

                <div class="form-actions">
                    <button class="btn btn-primary" id="generateBtn" ${!this.isFormValid() ? 'disabled' : ''}>
                        Generate Plan
                    </button>
                    <button class="btn btn-secondary" id="backBtn">
                        ← Back
                    </button>
                </div>
            </div>
        `;

        // Attach event listeners
        const groups = {
            'videoTypeGroup': 'videoType',
            'videoGoalGroup': 'videoGoal',
            'platformGroup': 'targetPlatform',
            'durationGroup': 'videoDuration',
            'experienceGroup': 'experienceLevel',
            'budgetGroup': 'budget',
            'needsGroup': 'productionNeeds'
        };

        Object.entries(groups).forEach(([groupId, fieldName]) => {
            const group = container.querySelector(`#${groupId}`);
            const chips = group.querySelectorAll('.chip');
            chips.forEach(chip => {
                chip.addEventListener('click', (e) => {
                    e.preventDefault();
                    const value = chip.dataset.value;
                    if (fieldName !== 'productionNeeds') {
                        chips.forEach(c => c.classList.remove('active'));
                    }
                    chip.classList.toggle('active');
                    this.setFormValue(fieldName, value);
                });
            });
        });

        container.querySelector('#generateBtn').addEventListener('click', () => {
            if (this.isFormValid()) {
                this.navigateTo('results');
            }
        });

        container.querySelector('#backBtn').addEventListener('click', () => {
            this.navigateTo('landing');
        });

        container.appendChild(this.createFooter());
        return container;
    },

    renderResults() {
        const container = document.createElement('div');
        container.className = 'page-container results-container';

        const recommendations = this.getRecommendations();
        const { videoType, videoGoal, targetPlatform, videoDuration, experienceLevel, budget } = this.formData;

        container.innerHTML = `
            <div class="results-header">
                <h2>Your production plan</h2>
                <p>Based on your selections</p>
            </div>

            <div class="input-summary" id="inputSummary"></div>

            <div class="results-section">
                <h3>📋 Recommended Workflow</h3>
                <div id="workflowGuidance"></div>
            </div>

            <div class="results-section">
                <h3>🛠️ Recommended Tools</h3>
                <div id="recommendedTools"></div>
            </div>

            <div class="results-section">
                <h3>💡 Why These Tools</h3>
                <div id="whyThese"></div>
            </div>

            <div class="results-section">
                <h3>📚 Workflow Tips</h3>
                <div id="tips"></div>
            </div>

            <div class="results-section">
                <h3>⚠️ Common Mistakes to Avoid</h3>
                <div id="mistakes"></div>
            </div>

            <div class="results-section">
                <h3>💸 Cost Considerations</h3>
                <div id="costs"></div>
            </div>

            <div class="results-actions">
                <button class="btn btn-primary" id="refineBtn">
                    ✏️ Refine Plan
                </button>
                <button class="btn btn-secondary" id="startOverBtn">
                    🔄 Start Over
                </button>
            </div>
        `;

        // Render input summary
        const summaryContainer = container.querySelector('#inputSummary');
        const summaryItems = [
            { label: 'Type', value: videoType },
            { label: 'Goal', value: videoGoal },
            { label: 'Platform', value: targetPlatform },
            { label: 'Duration', value: videoDuration },
            { label: 'Level', value: experienceLevel },
            { label: 'Budget', value: budget }
        ];

        summaryItems.forEach(item => {
            const chip = document.createElement('div');
            chip.className = 'summary-chip';
            chip.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
            summaryContainer.appendChild(chip);
        });

        // Render workflow guidance
        const workflowContainer = container.querySelector('#workflowGuidance');
        const workflow = this.generateWorkflowGuidance();
        workflow.steps.forEach((step, index) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'card';
            stepDiv.innerHTML = `
                <h4>${index + 1}. ${step.title}</h4>
                <p>${step.description}</p>
            `;
            workflowContainer.appendChild(stepDiv);
        });

        // Render recommended tools
        const toolsContainer = container.querySelector('#recommendedTools');
        Object.entries(recommendations).forEach(([category, tools]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `<h4 style="margin-bottom: 12px; color: var(--accent-cyan);">${category}</h4>`;
            
            tools.slice(0, 2).forEach(tool => {
                const toolDiv = document.createElement('div');
                toolDiv.className = 'tool-recommendation';
                toolDiv.innerHTML = `
                    <div class="tool-name">${tool.name}</div>
                    <div class="tool-category">${tool.category}</div>
                    <div class="tool-description">${tool.description}</div>
                `;
                categoryDiv.appendChild(toolDiv);
            });
            
            toolsContainer.appendChild(categoryDiv);
        });

        // Render why these tools
        const whyContainer = container.querySelector('#whyThese');
        const whyReasons = this.generateWhyReasons(recommendations);
        whyReasons.forEach(reason => {
            const reasonDiv = document.createElement('div');
            reasonDiv.className = 'card';
            reasonDiv.innerHTML = `
                <h4>${reason.title}</h4>
                <p>${reason.description}</p>
            `;
            whyContainer.appendChild(reasonDiv);
        });

        // Render tips
        const tipsContainer = container.querySelector('#tips');
        const tips = this.generateTips();
        tips.forEach(tip => {
            const tipDiv = document.createElement('div');
            tipDiv.className = 'card';
            tipDiv.innerHTML = `
                <h4>💡 ${tip.title}</h4>
                <p>${tip.description}</p>
            `;
            tipsContainer.appendChild(tipDiv);
        });

        // Render mistakes
        const mistakesContainer = container.querySelector('#mistakes');
        const mistakes = this.generateMistakes();
        mistakes.forEach(mistake => {
            const mistakeDiv = document.createElement('div');
            mistakeDiv.className = 'card';
            mistakeDiv.innerHTML = `
                <h4>🚫 ${mistake.title}</h4>
                <p>${mistake.description}</p>
            `;
            mistakesContainer.appendChild(mistakeDiv);
        });

        // Render costs
        const costsContainer = container.querySelector('#costs');
        const costs = this.generateCostConsiderations();
        costs.forEach(cost => {
            const costDiv = document.createElement('div');
            costDiv.className = 'card';
            costDiv.innerHTML = `
                <h4>${cost.title}</h4>
                <p>${cost.description}</p>
            `;
            costsContainer.appendChild(costDiv);
        });

        container.querySelector('#refineBtn').addEventListener('click', () => {
            this.navigateTo('requirements');
        });

        container.querySelector('#startOverBtn').addEventListener('click', () => {
            this.resetForm();
        });

        container.appendChild(this.createFooter());
        return container;
    },

    generateWorkflowGuidance() {
        const { videoType, experienceLevel, videoDuration } = this.formData;
        
        if (experienceLevel === 'Beginner') {
            return {
                steps: [
                    { title: 'Plan your concept', description: 'Start with a clear script or outline of your video idea. Use AI tools to help structure your narrative.' },
                    { title: 'Generate visual assets', description: 'Create images and video clips using AI generation tools based on your script.' },
                    { title: 'Add voice and audio', description: 'Generate voiceover and music to complement your visuals.' },
                    { title: 'Edit and refine', description: 'Use your editing tool to combine everything into a polished final video.' }
                ]
            };
        } else {
            return {
                steps: [
                    { title: 'Develop detailed script', description: 'Create a comprehensive script with precise timing, transitions, and technical notes.' },
                    { title: 'Create reference assets', description: 'Generate initial images and video sequences to establish your visual direction.' },
                    { title: 'Iterative generation', description: 'Use advanced controls to refine video scenes, motion, and composition.' },
                    { title: 'Audio integration', description: 'Add custom voice synthesis and music generation with precise timing.' },
                    { title: 'Advanced editing', description: 'Perform color grading, effects, and fine-tuned editing for a professional result.' }
                ]
            };
        }
    },

    generateWhyReasons(recommendations) {
        const { budget, experienceLevel, targetPlatform } = this.formData;
        const reasons = [];

        if (budget === 'Free') {
            reasons.push({
                title: 'Budget-Conscious Selection',
                description: 'These tools offer free or freemium options that meet your production needs without requiring paid subscriptions.'
            });
        } else if (budget === 'Low') {
            reasons.push({
                title: 'Cost-Effective Balance',
                description: 'These tools provide excellent quality at low cost or with generous free tiers, maximizing your budget.'
            });
        } else {
            reasons.push({
                title: 'Quality Focused',
                description: 'With flexible budget, these tools are selected for their superior quality and capabilities, regardless of cost.'
            });
        }

        if (experienceLevel === 'Beginner') {
            reasons.push({
                title: 'User-Friendly Design',
                description: 'These tools have intuitive interfaces that minimize the learning curve for beginners.'
            });
        } else {
            reasons.push({
                title: 'Advanced Capabilities',
                description: 'These tools offer powerful advanced features for experienced creators to achieve professional results.'
            });
        }

        if (targetPlatform === 'TikTok' || targetPlatform === 'Instagram') {
            reasons.push({
                title: 'Short-Form Optimized',
                description: 'These tools are optimized for quick production and vertical video formats.'
            });
        } else if (targetPlatform === 'YouTube') {
            reasons.push({
                title: 'Long-Form Support',
                description: 'These tools support longer, more detailed productions with comprehensive editing capabilities.'
            });
        }

        return reasons;
    },

    generateTips() {
        const { videoDuration, targetPlatform, videoType } = this.formData;
        const tips = [];

        tips.push({
            title: 'Start with a strong script',
            description: 'Your script is the foundation. Take time to develop compelling narratives that will engage your audience.'
        });

        if (videoDuration === 'Short') {
            tips.push({
                title: 'Keep it concise',
                description: 'Every second counts in short-form content. Cut unnecessary information and maintain fast pacing.'
            });
        } else if (videoDuration === 'Long') {
            tips.push({
                title: 'Maintain consistent pacing',
                description: 'In longer videos, vary pacing and use transitions to keep viewers engaged throughout.'
            });
        }

        if (targetPlatform === 'YouTube') {
            tips.push({
                title: 'Optimize for watch time',
                description: 'Use clear thumbnails, engaging introductions, and natural transitions to maximize viewer retention.'
            });
        } else if (targetPlatform === 'TikTok' || targetPlatform === 'Instagram') {
            tips.push({
                title: 'Hook viewers in the first second',
                description: 'Social media viewers decide quickly. Start with an immediate hook or compelling visual.'
            });
        }

        if (videoType === 'Educational') {
            tips.push({
                title: 'Use visuals to explain concepts',
                description: 'AI-generated visuals can effectively illustrate abstract concepts and maintain viewer interest.'
            });
        }

        return tips;
    },

    generateMistakes() {
        const mistakes = [];

        mistakes.push({
            title: 'Neglecting audio quality',
            description: 'Poor audio is immediately noticeable and can ruin an otherwise great video. Prioritize clean voiceover and music.'
        });

        mistakes.push({
            title: 'Overcomplicating the workflow',
            description: 'Start simple. Complex multi-tool workflows can introduce errors and delays. Build complexity only when needed.'
        });

        mistakes.push({
            title: 'Not testing tool outputs',
            description: 'Always review AI-generated content before finalizing. Errors in scripts, images, or video need correction.'
        });

        mistakes.push({
            title: 'Ignoring platform requirements',
            description: 'Each platform has specific dimensions, durations, and codec requirements. Check platform specifications early.'
        });

        mistakes.push({
            title: 'Skipping consistency checks',
            description: 'Ensure visual style, tone, and messaging are consistent throughout your video for professional results.'
        });

        return mistakes;
    },

    generateCostConsiderations() {
        const { budget, productionNeeds } = this.formData;
        const considerations = [];

        if (budget === 'Free') {
            considerations.push({
                title: 'Free tier limitations',
                description: 'Note: Free tiers may have usage limits, watermarks, or quality restrictions. Check current terms before production.'
            });
            considerations.push({
                title: 'Account setup required',
                description: 'Free tools typically require account creation. Set up accounts early to avoid delays during production.'
            });
        } else if (budget === 'Low') {
            considerations.push({
                title: 'Subscription costs',
                description: 'Budget tools may have tiered pricing. Compare plans to find the best value for your production needs.'
            });
            considerations.push({
                title: 'Freemium vs Paid tiers',
                description: 'Many tools offer free tiers with premium features. Test free versions first to decide if paid features are needed.'
            });
        } else {
            considerations.push({
                title: 'Premium access for quality',
                description: 'Premium tiers typically offer higher resolution, more features, and better support.'
            });
            considerations.push({
                title: 'Batch usage discounts',
                description: 'Consider annual or multi-project subscriptions for potential cost savings across multiple videos.'
            });
        }

        considerations.push({
            title: 'Hidden costs to consider',
            description: 'Some tools charge per export, per minute of content, or for advanced features. Factor these into your budget.'
        });

        return considerations;
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    app.render();
});
