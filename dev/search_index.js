var documenterSearchIndex = {"docs":
[{"location":"history_recorder/#History-Recorder","page":"History Recorder","title":"History Recorder","text":"","category":"section"},{"location":"history_recorder/","page":"History Recorder","title":"History Recorder","text":"A HistoryRecorder runs a simulation and records the trajectory. It returns an AbstractVector of NamedTuples - see Histories for more info.","category":"page"},{"location":"history_recorder/","page":"History Recorder","title":"History Recorder","text":"hr = HistoryRecorder(max_steps=100)\npomdp = TigerPOMDP()\npolicy = RandomPolicy(pomdp)\n\nh = simulate(hr, pomdp, policy)","category":"page"},{"location":"history_recorder/","page":"History Recorder","title":"History Recorder","text":"More examples can be found in the POMDPExamples Package.","category":"page"},{"location":"history_recorder/","page":"History Recorder","title":"History Recorder","text":"HistoryRecorder","category":"page"},{"location":"history_recorder/#POMDPSimulators.HistoryRecorder","page":"History Recorder","title":"POMDPSimulators.HistoryRecorder","text":"A simulator that records the history for later examination\n\nThe simulation will be terminated when either\n\na terminal state is reached (as determined by isterminal() or\nthe discount factor is as small as eps or\nmax_steps have been executed\n\nKeyword Arguments:     - rng: The random number generator for the simulation     - capture_exception::Bool: whether to capture an exception and store it in the history, or let it go uncaught, potentially killing the script     - show_progress::Bool: show a progress bar for the simulation     - eps     - max_steps\n\nUsage (optional arguments in brackets):\n\nhr = HistoryRecorder()\nhistory = simulate(hr, pomdp, policy, [updater [, init_belief [, init_state]]])\n\n\n\n\n\n","category":"type"},{"location":"rollout/#Rollout","page":"Rollout","title":"Rollout","text":"","category":"section"},{"location":"rollout/#RolloutSimulator","page":"Rollout","title":"RolloutSimulator","text":"","category":"section"},{"location":"rollout/","page":"Rollout","title":"Rollout","text":"RolloutSimulator is the simplest MDP or POMDP simulator. When simulate is called, it simply simulates a single trajectory of the process and returns the discounted reward.","category":"page"},{"location":"rollout/","page":"Rollout","title":"Rollout","text":"rs = RolloutSimulator()\nmdp = GridWorld()\npolicy = RandomPolicy(mdp)\n\nr = simulate(rs, mdp, policy)","category":"page"},{"location":"rollout/","page":"Rollout","title":"Rollout","text":"More examples can be found in the POMDPExamples Package","category":"page"},{"location":"rollout/","page":"Rollout","title":"Rollout","text":"RolloutSimulator","category":"page"},{"location":"rollout/#POMDPSimulators.RolloutSimulator","page":"Rollout","title":"POMDPSimulators.RolloutSimulator","text":"RolloutSimulator(rng, max_steps)\nRolloutSimulator(; <keyword arguments>)\n\nA fast simulator that just returns the reward\n\nThe simulation will be terminated when either\n\na terminal state is reached (as determined by isterminal() or\nthe discount factor is as small as eps or\nmax_steps have been executed\n\nKeyword arguments:\n\nrng: A random number generator to use.\neps: A small number; if γᵗ where γ is the discount factor and t is the time step becomes smaller than this, the simulation will be terminated.\nmax_steps: The maximum number of steps to simulate.\n\nUsage (optional arguments in brackets):\n\nro = RolloutSimulator()\nhistory = simulate(ro, pomdp, policy, [updater [, init_belief [, init_state]]])\n\nSee also: HistoryRecorder, run_parallel\n\n\n\n\n\n","category":"type"},{"location":"histories/#Histories","page":"Histories","title":"Histories","text":"","category":"section"},{"location":"histories/","page":"Histories","title":"Histories","text":"The results produced by HistoryRecorders and the sim function are contained in SimHistory objects.","category":"page"},{"location":"histories/","page":"Histories","title":"Histories","text":"SimHistory","category":"page"},{"location":"histories/#POMDPSimulators.SimHistory","page":"Histories","title":"POMDPSimulators.SimHistory","text":"SimHistory\n\nAn (PO)MDP simulation history returned by simulate(::HistoryRecorder, ::Union{MDP,POMDP},...).\n\nThis is an AbstractVector of NamedTuples containing the states, actions, etc.\n\nExamples\n\nhist[1][:s] # returns the first state in the history\n\nhist[:a] # returns all of the actions in the history\n\n\n\n\n\n","category":"type"},{"location":"histories/#Examples","page":"Histories","title":"Examples","text":"","category":"section"},{"location":"histories/","page":"Histories","title":"Histories","text":"using POMDPSimulators, POMDPs, POMDPModels, POMDPPolicies\nhr = HistoryRecorder(max_steps=10)\nhist = simulate(hr, BabyPOMDP(), FunctionPolicy(x->true))\nstep = hist[1] # all information available about the first step\nstep[:s] # the first state\nstep[:a] # the first action","category":"page"},{"location":"histories/","page":"Histories","title":"Histories","text":"To see everything available in a step, use","category":"page"},{"location":"histories/","page":"Histories","title":"Histories","text":"keys(first(hist))","category":"page"},{"location":"histories/","page":"Histories","title":"Histories","text":"The entire history of each variable is available by using a Symbol instead of an index, i.e.","category":"page"},{"location":"histories/","page":"Histories","title":"Histories","text":"hist[:s]","category":"page"},{"location":"histories/","page":"Histories","title":"Histories","text":"will return a vector of the starting states for each step (note the difference between :s and :sp).","category":"page"},{"location":"histories/#eachstep","page":"Histories","title":"eachstep","text":"","category":"section"},{"location":"histories/","page":"Histories","title":"Histories","text":"The eachstep function may also be useful:","category":"page"},{"location":"histories/","page":"Histories","title":"Histories","text":"eachstep","category":"page"},{"location":"histories/#POMDPSimulators.eachstep","page":"Histories","title":"POMDPSimulators.eachstep","text":"for t in eachstep(hist, [spec])\n    ...\nend\n\nIterate through the steps in SimHistory hist. spec is a tuple of symbols or string that controls what is returned for each step.\n\nFor example,\n\nfor (s, a, r, sp) in eachstep(h, \"(s, a, r, sp)\")    \n    println(\"reward $r received when state $sp was reached after action $a was taken in state $s\")\nend\n\nreturns the start state, action, reward and destination state for each step of the simulation.\n\nAlternatively, instead of expanding the steps implicitly, the elements of the step can be accessed as fields (since each step is a NamedTuple):\n\nfor step in eachstep(h, \"(s, a, r, sp)\")    \n    println(\"reward $(step.r) received when state $(step.sp) was reached after action $(step.a) was taken in state $(step.s)\")\nend\n\nThe possible valid elements in the iteration specification are\n\nAny node in the (PO)MDP Dynamic Decision network (by default :s, :a, :sp, :o, :r)\nb - the initial belief in the step (for POMDPs only)\nbp - the belief after being updated based on o (for POMDPs only)\naction_info - info from the policy decision (from action_info)\nupdate_info - info from the belief update (from update_info)\nt - the timestep index\n\n\n\n\n\n","category":"function"},{"location":"histories/#Examples:","page":"Histories","title":"Examples:","text":"","category":"section"},{"location":"histories/","page":"Histories","title":"Histories","text":"collect(eachstep(h, \"a,o\"))","category":"page"},{"location":"histories/","page":"Histories","title":"Histories","text":"will produce a vector of action-observation named tuples.","category":"page"},{"location":"histories/","page":"Histories","title":"Histories","text":"collect(norm(sp-s) for (s,sp) in eachstep(h, \"s,sp\"))","category":"page"},{"location":"histories/","page":"Histories","title":"Histories","text":"will produce a vector of the distances traveled on each step (assuming the state is a Euclidean vector).","category":"page"},{"location":"histories/#Notes","page":"Histories","title":"Notes","text":"","category":"section"},{"location":"histories/","page":"Histories","title":"Histories","text":"The iteration specification can be specified as a tuple of symbols (e.g. (:s, :a)) instead of a string.\nFor type stability in performance-critical code, one should construct an iterator directly using HistoryIterator{typeof(h), (:a,:r)}(h) rather than eachstep(h, \"ar\").","category":"page"},{"location":"histories/#Other-Functions","page":"Histories","title":"Other Functions","text":"","category":"section"},{"location":"histories/","page":"Histories","title":"Histories","text":"state_hist(h), action_hist(h), observation_hist(h) belief_hist(h), and reward_hist(h) will return vectors of the states, actions, and rewards, and undiscounted_reward(h) and discounted_reward(h) will return the total rewards collected over the trajectory. n_steps(h) returns the number of steps in the history. exception(h) and backtrace(h) can be used to hold an exception if the simulation failed to finish.","category":"page"},{"location":"histories/","page":"Histories","title":"Histories","text":"view(h, range) (e.g. view(h, 1:n_steps(h)-4)) can be used to create a view of the history object h that only contains a certain range of steps. The object returned by view is an AbstractSimHistory that can be iterated through and manipulated just like a complete SimHistory.","category":"page"},{"location":"parallel/#Parallel","page":"Parallel","title":"Parallel","text":"","category":"section"},{"location":"parallel/","page":"Parallel","title":"Parallel","text":"POMDPSimulators contains a utility for running many Monte Carlo simulations in parallel to evaluate performance. The basic workflow involves the following steps:","category":"page"},{"location":"parallel/","page":"Parallel","title":"Parallel","text":"Create a vector of Sim objects, each specifying how a single simulation should be run.\nUse the run_parallel or run function to run the simulations.\nAnalyze the results of the simulations contained in the DataFrame returned by run_parallel.","category":"page"},{"location":"parallel/#Example","page":"Parallel","title":"Example","text":"","category":"section"},{"location":"parallel/","page":"Parallel","title":"Parallel","text":"An example can be found in the POMDPExamples Package.","category":"page"},{"location":"parallel/#Sim-objects","page":"Parallel","title":"Sim objects","text":"","category":"section"},{"location":"parallel/","page":"Parallel","title":"Parallel","text":"Each simulation should be specified by a Sim object which contains all the information needed to run a simulation, including the Simulator, POMDP or MDP, Policy, Updater, and any other ingredients.","category":"page"},{"location":"parallel/","page":"Parallel","title":"Parallel","text":"Sim","category":"page"},{"location":"parallel/#POMDPSimulators.Sim","page":"Parallel","title":"POMDPSimulators.Sim","text":"Sim(m::MDP, p::Policy[, initialstate]; kwargs...)\nSim(m::POMDP, p::Policy[, updater[, initial_belief[, initialstate]]]; kwargs...)\n\nCreate a Sim object that contains everything needed to run and record a single simulation, including model, initial conditions, and metadata.\n\nA vector of Sim objects can be executed with run or run_parallel.\n\nKeyword Arguments\n\nrng::AbstractRNG=Random.GLOBAL_RNG\nmax_steps::Int=typemax(Int)\nsimulator::Simulator=HistoryRecorder(rng=rng, max_steps=max_steps)\nmetadata::NamedTuple a named tuple (or dictionary) of metadata for the sim that will be recorded, e.g.(solver_iterations=500,)`.\n\n\n\n\n\n","category":"type"},{"location":"parallel/#Running-simulations","page":"Parallel","title":"Running simulations","text":"","category":"section"},{"location":"parallel/","page":"Parallel","title":"Parallel","text":"The simulations are actually carried out by the run and run_parallel functions.","category":"page"},{"location":"parallel/","page":"Parallel","title":"Parallel","text":"run_parallel","category":"page"},{"location":"parallel/#POMDPSimulators.run_parallel","page":"Parallel","title":"POMDPSimulators.run_parallel","text":"run_parallel(queue::Vector{Sim})\nrun_parallel(f::Function, queue::Vector{Sim})\n\nRun Sim objects in queue in parallel and return results as a DataFrame.\n\nBy default, the DataFrame will contain the reward for each simulation and the metadata provided to the sim.\n\nArguments\n\nqueue: List of Sim objects to be executed\nf: Function to process the results of each simulation\n\nThis function should take two arguments, (1) the Sim that was executed and (2) the result of the simulation, by default a SimHistory. It should return a named tuple that will appear in the dataframe. See Examples below.\n\nKeyword Arguments\n\nshow_progress::Bool: whether or not to show a progress meter\nprogress::ProgressMeter.Progress: determines how the progress meter is displayed\n\nExamples\n\nrun_parallel(queue) do sim, hist\n    return (n_steps=n_steps(hist), reward=discounted_reward(hist))\nend\n\nwill return a dataframe with with the number of steps and the reward in it.\n\n\n\n\n\n","category":"function"},{"location":"parallel/","page":"Parallel","title":"Parallel","text":"The run function is also provided to run simulations in serial (this is often useful for debugging). Note that the documentation below also contains a section for the builtin julia run function, even though it is not relevant here.","category":"page"},{"location":"parallel/","page":"Parallel","title":"Parallel","text":"run","category":"page"},{"location":"parallel/#Base.run","page":"Parallel","title":"Base.run","text":"run(queue::Vector{Sim})\nrun(f::Function, queue::Vector{Sim})\n\nRun the Sim objects in queue on a single process and return the results as a dataframe.\n\nSee run_parallel for more information.\n\n\n\n\n\n","category":"function"},{"location":"parallel/#Specifying-information-to-be-recorded","page":"Parallel","title":"Specifying information to be recorded","text":"","category":"section"},{"location":"parallel/","page":"Parallel","title":"Parallel","text":"By default, only the discounted rewards from each simulation are recorded, but arbitrary information can be recorded.","category":"page"},{"location":"parallel/","page":"Parallel","title":"Parallel","text":"The run_parallel and run functions accept a function (normally specified via the do syntax) that takes the Sim object and history of the simulation and extracts relevant statistics as a named tuple. For example, if the desired characteristics are the number of steps in the simulation and the reward, run_parallel would be invoked as follows:","category":"page"},{"location":"parallel/","page":"Parallel","title":"Parallel","text":"df = run_parallel(queue) do sim::Sim, hist::SimHistory\n    return (n_steps=n_steps(hist), reward=discounted_reward(hist))\nend","category":"page"},{"location":"parallel/","page":"Parallel","title":"Parallel","text":"These statistics are combined into a DataFrame, with each line representing a single simulation, allowing for statistical analysis. For example,","category":"page"},{"location":"parallel/","page":"Parallel","title":"Parallel","text":"mean(df[:reward]./df[:n_steps])","category":"page"},{"location":"parallel/","page":"Parallel","title":"Parallel","text":"would compute the average reward per step with each simulation weighted equally regardless of length.","category":"page"},{"location":"display/#Display","page":"Display","title":"Display","text":"","category":"section"},{"location":"display/#DisplaySimulator","page":"Display","title":"DisplaySimulator","text":"","category":"section"},{"location":"display/","page":"Display","title":"Display","text":"The DisplaySimulator displays each step of a simulation in real time through a multimedia display such as a Jupyter notebook or ElectronDisplay. Specifically it uses POMDPModelTools.render and the built-in Julia display function to visualize each step.","category":"page"},{"location":"display/","page":"Display","title":"Display","text":"Example:","category":"page"},{"location":"display/","page":"Display","title":"Display","text":"using POMDPs\nusing POMDPModels\nusing POMDPPolicies\nusing POMDPSimulators\nusing ElectronDisplay\nElectronDisplay.CONFIG.single_window = true\n\nds = DisplaySimulator()\nm = SimpleGridWorld()\nsimulate(ds, m, RandomPolicy(m))","category":"page"},{"location":"display/","page":"Display","title":"Display","text":"DisplaySimulator","category":"page"},{"location":"display/#POMDPSimulators.DisplaySimulator","page":"Display","title":"POMDPSimulators.DisplaySimulator","text":"DisplaySimulator(;kwargs...)\n\nCreate a simulator that displays each step of a simulation.\n\nGiven a POMDP or MDP model m, this simulator roughly works like\n\nfor step in stepthrough(m, ...)\n    display(render(m, step))\nend\n\nKeyword Arguments\n\ndisplay::AbstractDisplay: the display to use for the first argument to the display function. If this is nothing, display(...) will be called without an AbstractDisplay argument.\nrender_kwargs::NamedTuple: keyword arguments for POMDPModelTools.render(...)\nmax_fps::Number=10: maximum number of frames to be displayed per second - sleep will be used to skip extra time, so this is not designed for high precision\npredisplay::Function: function to call before every call to display(...). The only argument to this function will be the display (if it is specified) or nothing\nextra_initial::Bool=false: if true, display an extra step at the beginning with only elements t, sp, and bp for POMDPs (this can be useful to see the initial state if render displays only sp and not s).\nextra_final::Bool=true: iftrue, display an extra step at the end with only elementst,done,s, andbfor POMDPs (this can be useful to see the final state ifrenderdisplays onlysand notsp`).\nmax_steps::Integer: maximum number of steps to run for\nspec::NTuple{Symbol}: specification of what step elements to display (see eachstep)\nrng::AbstractRNG: random number generator\n\nSee the POMDPSimulators documentation for more tips about using specific displays.\n\n\n\n\n\n","category":"type"},{"location":"display/#Display-specific-tips","page":"Display","title":"Display-specific tips","text":"","category":"section"},{"location":"display/","page":"Display","title":"Display","text":"The following tips may be helpful when using particular displays.","category":"page"},{"location":"display/#Jupyter-notebooks","page":"Display","title":"Jupyter notebooks","text":"","category":"section"},{"location":"display/","page":"Display","title":"Display","text":"By default, in a Jupyter notebook, the visualizations of all steps are displayed in the output box one after another. To make the output animated instead, where the image is overwritten at each step, one may use","category":"page"},{"location":"display/","page":"Display","title":"Display","text":"DisplaySimulator(predisplay=(d)->IJulia.clear_output(true))","category":"page"},{"location":"display/#ElectronDisplay","page":"Display","title":"ElectronDisplay","text":"","category":"section"},{"location":"display/","page":"Display","title":"Display","text":"By default, ElectronDisplay will open a new window for each new step. To prevent this, use","category":"page"},{"location":"display/","page":"Display","title":"Display","text":"ElectronDisplay.CONFIG.single_window = true","category":"page"},{"location":"sim/#sim-function","page":"sim()","title":"sim()","text":"","category":"section"},{"location":"sim/","page":"sim()","title":"sim()","text":"The sim function provides a convenient way to interact with a POMDP or MDP environment and return a history. The first argument is a function that is called at every time step and takes a state (in the case of an MDP) or an observation (in the case of a POMDP) as the argument and then returns an action. The second argument is a pomdp or mdp. It is intended to be used with Julia's do syntax as follows:","category":"page"},{"location":"sim/","page":"sim()","title":"sim()","text":"pomdp = TigerPOMDP()\nhistory = sim(pomdp, max_steps=10) do obs\n    println(\"Observation was $obs.\")\n    return TIGER_OPEN_LEFT\nend","category":"page"},{"location":"sim/","page":"sim()","title":"sim()","text":"This allows a flexible and general way to interact with a POMDP environment without creating new Policy types.","category":"page"},{"location":"sim/","page":"sim()","title":"sim()","text":"In the POMDP case, an updater can optionally be supplied as an additional positional argument if the policy function works with beliefs rather than directly with observations.","category":"page"},{"location":"sim/","page":"sim()","title":"sim()","text":"More examples can be found in the POMDPExamples Package","category":"page"},{"location":"sim/","page":"sim()","title":"sim()","text":"More examples can be found in the POMDPExamples Package","category":"page"},{"location":"sim/","page":"sim()","title":"sim()","text":"sim","category":"page"},{"location":"sim/#POMDPSimulators.sim","page":"sim()","title":"POMDPSimulators.sim","text":"sim(polfunc::Function, mdp::MDP; [<keyword arguments>])\nsim(polfunc::Function, pomdp::POMDP; [<keyword arguments>])\n\nAlternative way of running a simulation with a function specifying how to calculate the action at each timestep.\n\nUsage\n\nsim(mdp) do s\n    # code that calculates action `a` based on `s` - this is the policy\n    # you can also do other things like display something\n    return a\nend\n\nfor an MDP or\n\nsim(pomdp) do o\n    # code that calculates 'a' based on observation `o`\n    # optionally you could save 'o' in a global variable or do a belief update\n    return a\nend\n\nor with a POMDP\n\nsim(pomdp, updater) do b\n    # code that calculates 'a' based on belief `b`\n    # `b` is calculated by `updater`\n    return a\nend\n\nfor a POMDP and a belief updater.\n\nKeyword Arguments\n\nAll Versions\n\ninitialstate: the initial state for the simulation\nsimulator: keyword argument to specify any simulator to run the simulation. If nothing is specified for the simulator, a HistoryRecorder will be used as the simulator, with all keyword arguments forwarded to it, e.g.\nsim(mdp, max_steps=100, show_progress=true) do s\n    # ...\nend\nwill limit the simulation to 100 steps.\n\nPOMDP version\n\ninitialobs: this will control the initial observation given to the policy function. If this is not defined, gen(DDNNode{:o}, m, s, rng) will be used if it is available. If it is not, missing will be used.\n\nPOMDP and updater version\n\ninitialbelief: initialize_belief(updater, initialbelief) is the first belief that will be given to the policy function.\n\n\n\n\n\n","category":"function"},{"location":"stepthrough/#Stepping-through","page":"Stepping through","title":"Stepping through","text":"","category":"section"},{"location":"stepthrough/","page":"Stepping through","title":"Stepping through","text":"The stepthrough function exposes a simulation as an iterator so that the steps can be iterated through with a for loop syntax as follows:","category":"page"},{"location":"stepthrough/","page":"Stepping through","title":"Stepping through","text":"pomdp = BabyPOMDP()\npolicy = RandomPolicy(pomdp)\n\nfor (s, a, o, r) in stepthrough(pomdp, policy, \"s,a,o,r\", max_steps=10)\n    println(\"in state $s\")\n    println(\"took action $o\")\n    println(\"received observation $o and reward $r\")\nend","category":"page"},{"location":"stepthrough/","page":"Stepping through","title":"Stepping through","text":"More examples can be found in the POMDPExamples Package.","category":"page"},{"location":"stepthrough/","page":"Stepping through","title":"Stepping through","text":"stepthrough","category":"page"},{"location":"stepthrough/#POMDPSimulators.stepthrough","page":"Stepping through","title":"POMDPSimulators.stepthrough","text":"stepthrough(problem, policy, [spec])\nstepthrough(problem, policy, [spec], [rng=rng], [max_steps=max_steps])\nstepthrough(mdp::MDP, policy::Policy, [init_state], [spec]; [kwargs...])\nstepthrough(pomdp::POMDP, policy::Policy, [up::Updater, [initial_belief, [initial_state]]], [spec]; [kwargs...])\n\nCreate a simulation iterator. This is intended to be used with for loop syntax to output the results of each step as the simulation is being run. \n\nExample:\n\npomdp = BabyPOMDP()\npolicy = RandomPolicy(pomdp)\n\nfor (s, a, o, r) in stepthrough(pomdp, policy, \"s,a,o,r\", max_steps=10)\n    println(\"in state $s\")\n    println(\"took action $o\")\n    println(\"received observation $o and reward $r\")\nend\n\nThe optional spec argument can be a string, tuple of symbols, or single symbol and follows the same pattern as eachstep called on a SimHistory object.\n\nUnder the hood, this function creates a StepSimulator with spec and returns a [PO]MDPSimIterator by calling simulate with all of the arguments except spec. All keyword arguments are passed to the StepSimulator constructor.\n\n\n\n\n\n","category":"function"},{"location":"stepthrough/","page":"Stepping through","title":"Stepping through","text":"The StepSimulator contained in this file can provide the same functionality with the following syntax:","category":"page"},{"location":"stepthrough/","page":"Stepping through","title":"Stepping through","text":"sim = StepSimulator(\"s,a,r,sp\")\nfor (s,a,r,sp) in simulate(sim, problem, policy)\n    # do something\nend","category":"page"},{"location":"#Home","page":"Home","title":"Home","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"POMDPSimulators is a collection of utilities for simulating POMDPs.jl models. All of the simulators in this package should conform to the POMDPs.jl Simulation Standard.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Examples can be found in the simulation tutorial in the POMDPExamples package.","category":"page"},{"location":"","page":"Home","title":"Home","text":"If you are just getting started, probably the easiest way to begin is the stepthrough function. Otherwise, consult the Which Simulator Should I Use? page.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Pages = [\"index.md\",\n         \"which.md\",\n         \"rollout.md\",\n         \"parallel.md\",\n         \"history_recorder.md\",\n         \"histories.md\",\n         \"stepthrough.md\",\n         \"display.md\",\n         \"sim.md\"]","category":"page"},{"location":"which/#Which-Simulator-Should-I-Use?","page":"Which Simulator Should I Use?","title":"Which Simulator Should I Use?","text":"","category":"section"},{"location":"which/","page":"Which Simulator Should I Use?","title":"Which Simulator Should I Use?","text":"The simulators in this package provide interaction with simulations of MDP and POMDP environments from a variety of perspectives. Use this page to choose the best simulator to suit your needs.","category":"page"},{"location":"which/#I-want-to-run-fast-rollout-simulations-and-get-the-discounted-reward.","page":"Which Simulator Should I Use?","title":"I want to run fast rollout simulations and get the discounted reward.","text":"","category":"section"},{"location":"which/","page":"Which Simulator Should I Use?","title":"Which Simulator Should I Use?","text":"Use the Rollout Simulator.","category":"page"},{"location":"which/#I-want-to-evaluate-performance-with-many-parallel-Monte-Carlo-simulations.","page":"Which Simulator Should I Use?","title":"I want to evaluate performance with many parallel Monte Carlo simulations.","text":"","category":"section"},{"location":"which/","page":"Which Simulator Should I Use?","title":"Which Simulator Should I Use?","text":"Use the Parallel Simulator.","category":"page"},{"location":"which/#I-want-to-closely-examine-the-histories-of-states,-actions,-etc.-produced-by-simulations.","page":"Which Simulator Should I Use?","title":"I want to closely examine the histories of states, actions, etc. produced by simulations.","text":"","category":"section"},{"location":"which/","page":"Which Simulator Should I Use?","title":"Which Simulator Should I Use?","text":"Use the History Recorder.","category":"page"},{"location":"which/#I-want-to-step-through-each-individual-step-of-a-simulation.","page":"Which Simulator Should I Use?","title":"I want to step through each individual step of a simulation.","text":"","category":"section"},{"location":"which/","page":"Which Simulator Should I Use?","title":"Which Simulator Should I Use?","text":"Use the stepthrough function.","category":"page"},{"location":"which/#I-want-to-visualize-a-simulation.","page":"Which Simulator Should I Use?","title":"I want to visualize a simulation.","text":"","category":"section"},{"location":"which/","page":"Which Simulator Should I Use?","title":"Which Simulator Should I Use?","text":"Use the DisplaySimulator.","category":"page"},{"location":"which/","page":"Which Simulator Should I Use?","title":"Which Simulator Should I Use?","text":"Also see the POMDPGifs package for creating gif animations.","category":"page"},{"location":"which/#I-want-to-interact-with-a-MDP-or-POMDP-environment-from-the-policy's-perspective","page":"Which Simulator Should I Use?","title":"I want to interact with a MDP or POMDP environment from the policy's perspective","text":"","category":"section"},{"location":"which/","page":"Which Simulator Should I Use?","title":"Which Simulator Should I Use?","text":"Use the sim function.","category":"page"}]
}
