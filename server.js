// Set up ======================================================================
var express         = require('express');
var app             = express();
var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

// Configuration ===============================================================
mongoose.connect('mongodb://localhost:27017/proposaldb');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended':'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// Defining models =============================================================

  // Project -------------------------------------------------------------------
  var Project = mongoose.model('Project', {
    proposal  : { type: Schema.Types.ObjectId, ref: 'Proposal' },
    review    : { type: Schema.Types.ObjectId, ref: 'GeneralReview' }
  });

  // Proposal ------------------------------------------------------------------
  var Proposal = mongoose.model('Proposal', {
    author      : { type: Schema.Types.ObjectId, ref: 'Person' },
    subDate     : Date,
    submission  : { type: Schema.Types.ObjectId, ref: 'Submission' }
  });

  // Submission ----------------------------------------------------------------
  var Submission = mongoose.model('Submission', {
    projectStartDate      : Date,
    projectEndDate        : Date,
    projectTitle          : String,
    executiveSummary      : String,
    impactStatement       : String,
    benefitToCommunity    : String,
    scientificSummary     : String,
    technologicalSummary  : String,
    usecase               : String,
    newproject            : Boolean,
    projectType           : { type: Number, min: 0, max: 2 },
    pi                    : { type: Schema.Types.ObjectId, ref: 'Person' },
    copi                  : { type: Schema.Types.ObjectId, ref: 'Person' },
    members               : [{ type: Schema.Types.ObjectId, ref: 'Person' }],
    teams                 : [{ type: Schema.Types.ObjectId, ref: 'Team' }],
    tags                  : [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    relatedProjects       : [{ type: Schema.Types.ObjectId, ref: 'RelatedProject' }],
    shortDeliverable      : [{ type: Schema.Types.ObjectId, ref: 'ShortDeliverable' }],
    publications          : [{ type: Schema.Types.ObjectId, ref: 'Publication' }],
    grants                : [{ type: Schema.Types.ObjectId, ref: 'Grant' }],
    tasks                 : [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    requirements          : [{ type: Schema.Types.ObjectId, ref: 'Requirement' }],
    deliverables          : [{ type: Schema.Types.ObjectId, ref: 'Deliverable' }],
  });

  // Person --------------------------------------------------------------------
  var Person = mongoose.model('Person', {
    id            : Number,
    updatedAt     : Date,
    username      : String,
    givenName     : String,
    familyName    : String,
    displayName   : String,
    title         : String,
    profile       : String,
    picture       : String,
    emails        : [{ type: Schema.Types.ObjectId, ref: 'Email' }],
    phones        : [{ type: Schema.Types.ObjectId, ref: 'Phone' }],
    institutions  : [{ type: Schema.Types.ObjectId, ref: 'Institution' }],
    ims           : [String]
  });

  // Email ---------------------------------------------------------------------
  var Email = mongoose.model('Email',{
    value     : String,
    primary   : Boolean,
    verified  : Boolean
  });

  // Phone ---------------------------------------------------------------------
  var Phone = mongoose.model('Phone', {
    value     : String,
    primary   : Boolean
  });

  // Institution ---------------------------------------------------------------
  var Institution = mongoose.model('Institution', {
    name          : String,
    department    : String,
    postalAdress  : String,
    title         : String,
    primary       : Boolean
  });

  // Team ----------------------------------------------------------------------
  var Team = mongoose.model('Team', {
    name        : String,
    shortName   : String,
    displayName : String
  });

  // Related Project -----------------------------------------------------------
  var RelatedProject = mongoose.model('RelatedProject', {
    name          : String,
    startDate     : Date,
    endDate       : Date,
    description   : String
  });

  // Short Deliverable ---------------------------------------------------------
  var ShortDeliverable = mongoose.model('ShortDeliverable', {
    name          : String,
    deliveryDate  : Date,
    pm            : { type: Number, min: 0 }
  });

  // Publication ---------------------------------------------------------------
  var Publication = mongoose.model('Publication', {
    name  : String,
    link  : String
  });

  // Grant ---------------------------------------------------------------------
  var Grant = mongoose.model('Grant', {
    name  : String
  });

  // Task ----------------------------------------------------------------------
  var Task = mongoose.model('Task', {
    name  : String,
    grant : { type: Schema.Types.ObjectId, ref: 'Grant' }
  });

  // Tag -----------------------------------------------------------------------
  var Tag = mongoose.model('Tag', {
    name  : String
  });

  // Requirement ---------------------------------------------------------------
  var Requirement = mongoose.model('Requirement', {
    title       : String,
    type        : String,
    requirement : String,
    feature     : String,
    input       : [{ type: Schema.Types.ObjectId, ref: 'Input' }],
    output      : [{ type: Schema.Types.ObjectId, ref: 'Output' }]
  });

  // Input ---------------------------------------------------------------------
  var Input = mongoose.model('Input', {
    tag     : String,
    format  : String,
    number  : { type: Number, min:0 },
    size    : { type: Number, min:0 }
  });

  // Output --------------------------------------------------------------------
  var Output = mongoose.model('Output', {
    tag     : String,
    format  : String,
    number  : { type: Number, min:0 },
    size    : { type: Number, min:0 }
  });

  // Deliverable ---------------------------------------------------------------
  var Deliverable = mongoose.model('Deliverable', {
    name            : String,
    date            : Date,
    description     : String,
    risks           : String,
    dependency      : [{ type: Schema.Types.ObjectId, ref: 'Deliverable' }],
    requirements    : [{ type: Schema.Types.ObjectId, ref: 'Requirement' }],
    softdev         : [{ type: Schema.Types.ObjectId, ref: 'SoftDev' }],
    datatransfer    : [{ type: Schema.Types.ObjectId, ref: 'DataTransfer' }],
    collabs         : [{ type: Schema.Types.ObjectId, ref: 'Collab' }],
    virtualization  : [{ type: Schema.Types.ObjectId, ref: 'Virtualization' }],
    devenv          : [{ type: Schema.Types.ObjectId, ref: 'DevEnv' }],
    hpcRessource    : Boolean,
    cloudRessource  : Boolean,
    hpc             : [{ type: Schema.Types.ObjectId, ref:'Hpc'}],
    cloud           : [{ type: Schema.Types.ObjectId, ref:'Cloud'}],
    hardware        : [{ type: Schema.Types.ObjectId, ref:'Hardware'}],
    hr              : [{ type: Schema.Types.ObjectId, ref:'HumanRessource'}]
  });

  // Software Development ------------------------------------------------------
  var SoftDev = mongoose.model('SoftDev', {
    name : String,
    desc : String
  });

  // Data Transfer -------------------------------------------------------------
  var DataTransfer = mongoose.model('DataTransfer', {
    name : String,
    desc : String
  });

  // Collab --------------------------------------------------------------------
  var Collab = mongoose.model('Collab', {
    id      : Number,
    created : Date,
    edited  : Date,
    title   : String,
    content : String,
    private : Boolean,
    deleted : String
  });

  // Virtualization ------------------------------------------------------------
  var Virtualization = mongoose.model('Virtualization',{
    name : String,
    desc : String
  });

  // Development Environment ---------------------------------------------------
  var DevEnv = mongoose.model('DevEnv',{
    name : String,
    desc : String
  });

  // HPC Ressources ------------------------------------------------------------
  var Hpc = mongoose.model('Hpc', {
    type : { type: Schema.Types.ObjectId, ref: 'HpcType' },
    runs : { type: Number, min: 0 },
    time : { type: Number, min: 0 },
    part : { type: Number, min: 0 },
    arte : { type: Number, min: 0 },
    size : { type: Number, min: 0 }
  });

  // HPC Type ------------------------------------------------------------------
  var HpcType = mongoose.model('HpcType', {
    name : String,
    desc : String
  });

  // Cloud Ressources ----------------------------------------------------------
  var Cloud = mongoose.model('Cloud', {
    type : { type: Schema.Types.ObjectId, ref: 'CloudType' },
    runs : { type: Number, min: 0 },
    time : { type: Number, min: 0 },
    part : { type: Number, min: 0 },
    arte : { type: Number, min: 0 },
    size : { type: Number, min: 0 }
  });

  // Cloud Type ----------------------------------------------------------------
  var CloudType = mongoose.model('HCloudType', {
    name : String,
    desc : String
  });

  // Hardware ------------------------------------------------------------------
  var Hardware = mongoose.model('Hardware', {
    name        : String,
    price       : Number,
    link        : String,
    description : String
  });

  // Human Ressources ----------------------------------------------------------
  var HumanRessource = mongoose.model('HumanRessource', {
    name        : String,
    role        : { type : Schema.Types.ObjectId, ref : 'Role' },
    pm          : { type : Number, min : 0 },
    description : String
  });

  // Role ----------------------------------------------------------------------
  var Role = mongoose.model('Role', {
    name  : String
  });

  // General Review ------------------------------------------------------------
  var GeneralReview = mongoose.model('GeneralReview', {
    grade : Number,
    reviews : [{ type: Schema.Types.ObjectId, ref: 'Review' }]
  });

  // Review --------------------------------------------------------------------
  var Review = mongoose.model('Review', {
    reviewer  : { type: Schema.Types.ObjectId, ref: 'Person' },
    comments  : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    notes     : [{ type: Schema.Types.ObjectId, ref: 'Note' }]
  });

  // Comment -------------------------------------------------------------------
  var Comment = mongoose.model('Comment', {
    timestamp : Date,
    field     : String,
    value     : String
  });

  // Note -------------------------------------------------------------------
  var Note = mongoose.model('Note', {
    timestamp : Date,
    field     : String,
    value     : String
  });

// Routes ======================================================================

  // API -----------------------------------------------------------------------
    // Needed functions ........................................................
    // HandleError
    // Manage what to do in case of errors.
    function HandleError(err, res){
      res.send(err);
    }

    // findAll
    // Get all the element from a model
    //    target : Model from where the data should be get.
    function findAll(res,target){
      target.find(function(err, tar){
        if(err)
          HandleError(err,res);
        res.json(tar);
      });
    };

    // findOne
    // Get one of the element from a model by getting the id through route params.
    //    target : Model from where the data should be get.
    function findOne(req,res,target){
      target.findOne({
        _id : req.params.target_id
      },function(err, tar){
        if(err)
          HandleError(err,res);
        res.json(tar);
      });
    };

    // deleteOne
    // Delete an element from a model by getting the id through route params.
    //    target : Model wher the element should be deleted.
    function deleteOne(req,res,target){
      target.remove({
        _id : req.params.target_id
      }, function(err, tar) {
        if (err)
          HandleError(err,res);
        findAll(res, target);
      });
    };

    // Project .................................................................
    // Get all
    app.get('/api/projects', function(req, res){
      findAll(res, Project);
    });

    // Get one
    app.get('/api/projects/:target_id', function(req, res){
      findOne(req,res, Project);
    });

    // Create new Project
    app.post('/api/projects', function(req, res){
      Project.create({
        proposal  : req.body.proposal,
        review    : req.body.review,
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Project);
      });
    });

    // Delete the specified element
    app.delete('/api/projects/:target_id/delete', function(req,res) {
      deleteOne(req,res,Project);
    });

    // Proposal ................................................................
    // Get all
    app.get('/api/proposals', function(req, res){
      findAll(res, Proposal);
    });

    // Get one
    app.get('/api/proposals/:target_id', function(req, res){
      findOne(req,res, Proposal);
    });

    // Create new Proposal
    app.post('/api/proposals', function(req, res){
      Proposal.create({
        author      : req.body.author,
        subDate     : req.body.subDate,
        submission  : req.body.submission
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Proposal);
      });
    });

    // Delete the specified element
    app.delete('/api/proposals/:target_id/delete', function(req,res) {
      deleteOne(req,res,Proposal);
    });

    // Submission ..............................................................
    // Get all
    app.get('/api/submissions', function(req, res){
      findAll(res, Submission);
    });

    // Get one
    app.get('/api/submissions/:target_id', function(req, res){
      findOne(req,res, Submission);
    });

    // Create new Proposal
    app.post('/api/submissions', function(req, res){
      Submission.create({
        projectStartDate      : req.body.projectStartDate,
        projectEndDate        : req.body.projectEndDate,
        projectTitle          : req.body.projectTitle,
        executiveSummary      : req.body.executiveSummary,
        impactStatement       : req.body.impactStatement,
        benefitToCommunity    : req.body.benefitToCommunity,
        scientificSummary     : req.body.scientificSummary,
        technologicalSummary  : req.body.technologicalSummary,
        usecase               : req.body.usecase,
        newproject            : req.body.newproject,
        projectType           : req.body.projectType,
        pi                    : req.body.pi,
        copi                  : req.body.copi,
        members               : req.body.members,
        teams                 : req.body.teams,
        tags                  : req.body.tags,
        relatedProjects       : req.body.relatedProjects,
        shortDeliverable      : req.body.shortDeliverable,
        publications          : req.body.publications,
        grants                : req.body.grants,
        tasks                 : req.body.tasks,
        requirements          : req.body.requirements,
        deliverables          : req.body.deliverables
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Submission);
      });
    });

    // Delete the specified element
    app.delete('/api/submissions/:target_id/delete', function(req,res) {
      deleteOne(req,res,Submission);
    });

    // Person ..................................................................
    // Get all
    app.get('/api/persons', function(req, res){
      findAll(res, Person);
    });

    // Get one
    app.get('/api/persons/:target_id', function(req, res){
      findOne(req,res, Person);
    });

    // Create new Person
    app.post('/api/persons', function(req, res){
      Person.create({
        id            : req.body.id,
        updatedAt     : req.body.updatedAt,
        username      : req.body.username,
        givenName     : req.body.givenName,
        familyName    : req.body.familyName,
        displayName   : req.body.displayName,
        title         : req.body.title,
        profile       : req.body.profile,
        picture       : req.body.picture,
        emails        : req.body.emails,
        phones        : req.body.phones,
        institutions  : req.body.institutions,
        ims           : req.body.ims
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Person);
      });
    });

    // Delete the specified element
    app.delete('/api/persons/:target_id/delete', function(req,res) {
      deleteOne(req,res,Person);
    });

    // Email ...................................................................
    // Get all
    app.get('/api/emails', function(req, res){
      findAll(res, Email);
    });

    // Get one
    app.get('/api/emails/:target_id', function(req, res){
      findOne(req,res, Email);
    });

    // Create new Email
    app.post('/api/emails', function(req, res){
      Email.create({
        value     : req.body.value,
        primary   : req.body.primary,
        verified  : req.body.verified
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Email);
      });
    });

    // Delete the specified element
    app.delete('/api/emails/:target_id/delete', function(req,res) {
      deleteOne(req,res,Email);
    });

    // Phone ...................................................................
    // Get all
    app.get('/api/phones', function(req, res){
      findAll(res, Phone);
    });

    // Get one
    app.get('/api/phones/:target_id', function(req, res){
      findOne(req,res, Phone);
    });

    // Create new Phone
    app.post('/api/phones', function(req, res){
      Phone.create({
        value     : req.body.value,
        primary   : req.body.primary
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Phone);
      });
    });

    // Delete the specified element
    app.delete('/api/phones/:target_id/delete', function(req,res) {
      deleteOne(req,res,Phone);
    });

    // Institution .............................................................
    // Get all
    app.get('/api/institutions', function(req, res){
      findAll(res, Institution);
    });

    // Get one
    app.get('/api/institutions/:target_id', function(req, res){
      findOne(req,res, Institution);
    });

    // Create new Institution
    app.post('/api/institutions', function(req, res){
      Institution.create({
        name          : req.body.name,
        department    : req.body.department,
        postalAdress  : req.body.postalAdress,
        title         : req.body.title,
        primary       : req.body.primary
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Institution);
      });
    });

    // Delete the specified element
    app.delete('/api/institutions/:target_id/delete', function(req,res) {
      deleteOne(req,res,Institution);
    });

    // Team ....................................................................
    // Get all
    app.get('/api/teams', function(req, res){
      findAll(res, Team);
    });

    // Create new Team
    app.post('/api/teams', function(req, res){
      Team.create({
        name        : req.body.name,
        shortName   : req.body.shortName,
        displayName : 'BBP Team: ' + req.body.shortName
      }, function(err,team){
        if (err)
          HandleError(err,res);
        findAll(res, Team);
      });
    });

    // Delete the specified element
    app.delete('/api/teams/:target_id/delete', function(req,res) {
      deleteOne(req,res,Team);
    });

    // Related Project .........................................................
    // Get all
    app.get('/api/relatedprojects', function(req, res){
      findAll(res, RelatedProject);
    });

    // Get one
    app.get('/api/relatedprojects/:target_id', function(req, res){
      findOne(req,res, RelatedProject);
    });

    // Create new Related Project
    app.post('/api/relatedprojects', function(req, res){
      RelatedProject.create({
        name          : req.body.name,
        startDate     : req.body.startDate,
        endDate       : req.body.endDate,
        description   : req.body.description
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, RelatedProject);
      });
    });

    // Delete the specified element
    app.delete('/api/relatedprojects/:target_id/delete', function(req,res) {
      deleteOne(req,res,RelatedProject);
    });

    // Short Deliverable .......................................................
    // Get all
    app.get('/api/shortdeliverables', function(req, res){
      findAll(res, ShortDeliverable);
    });

    // Get one
    app.get('/api/shortdeliverables/:target_id', function(req, res){
      findOne(req,res, ShortDeliverable);
    });

    // Create new Short Deliverable
    app.post('/api/shortdeliverables', function(req, res){
      ShortDeliverable.create({
        name          : req.body.name,
        deliveryDate  : req.body.deliveryDate,
        pm            : req.body.pm
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, ShortDeliverable);
      });
    });

    // Delete the specified element
    app.delete('/api/shortdeliverables/:target_id/delete', function(req,res) {
      deleteOne(req,res,ShortDeliverable);
    });

    // Publication .............................................................
    // Get all
    app.get('/api/publications', function(req, res){
      findAll(res, Publication);
    });

    // Get one
    app.get('/api/publications/:target_id', function(req, res){
      findOne(req,res, Publication);
    });

    // Create new Publication
    app.post('/api/publications', function(req, res){
      Publication.create({
        name  : req.body.name,
        link  : req.body.link
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Publication);
      });
    });

    // Delete the specified element
    app.delete('/api/publications/:target_id/delete', function(req,res) {
      deleteOne(req,res,Publication);
    });

    // Grant ...................................................................
    // Get all
    app.get('/api/grants', function(req, res){
      findAll(res, Grant);
    });

    // Create new Grant
    app.post('/api/grants', function(req, res){
      Grant.create({
        name  : req.body.name
      }, function(err,grant){
        if (err)
          HandleError(err,res);
        findAll(res, Grant);
      });
    });

    // Delete the specified element
    app.delete('/api/grants/:target_id/delete', function(req,res) {
      deleteOne(req,res,Grant)
    });

    // Task ....................................................................
    // Get all
    app.get('/api/tasks', function(req, res){
      findAll(res, Task);
    });

    // Create new Task
    app.post('/api/tasks', function(req, res){
      Task.create({
        name  : req.body.name,
        grant  : req.body.grant
      }, function(err,task){
        if (err)
          HandleError(err,res);
        findAll(res, Task);
      });
    });

    // Delete the specified element
    app.delete('/api/tasks/:target_id/delete', function(req,res) {
      deleteOne(req,res,Task);
    });

    // Tag .....................................................................
    // Get all
    app.get('/api/tags', function(req, res){
      findAll(res, Tag);
    });

    // Create new Tag
    app.post('/api/tags', function(req, res){
      Tag.create({
        name  : req.body.name
      }, function(err,tag){
        if (err)
          HandleError(err,res);
        findAll(res, Tag);
      });
    });

    // Delete the specified element
    app.delete('/api/tags/:target_id/delete', function(req,res) {
      deleteOne(req,res,Tag);
    });

    // Requirement .............................................................
    // Get all
    app.get('/api/requirements', function(req, res){
      findAll(res, Requirement);
    });

    // Get one
    app.get('/api/requirements/:target_id', function(req, res){
      findOne(req,res, Requirement);
    });

    // Create new Requirement
    app.post('/api/requirements', function(req, res){
      Requirement.create({
        title       : req.body.title,
        type        : req.body.type,
        requirement : req.body.requirement,
        feature     : req.body.feature,
        input       : req.body.input,
        output      : req.body.output
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Requirement);
      });
    });

    // Delete the specified element
    app.delete('/api/requirements/:target_id/delete', function(req,res) {
      deleteOne(req,res,Requirement);
    });

    // Input ...................................................................
    // Get all
    app.get('/api/inputs', function(req, res){
      findAll(res, Input);
    });

    // Get one
    app.get('/api/inputs/:target_id', function(req, res){
      findOne(req,res, Input);
    });

    // Create new Input
    app.post('/api/inputs', function(req, res){
      Input.create({
        tag     : req.body.tag,
        format  : req.body.format,
        number  : req.body.number,
        size    : req.body.size
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Input);
      });
    });

    // Delete the specified element
    app.delete('/api/inputs/:target_id/delete', function(req,res) {
      deleteOne(req,res,Input);
    });

    // Output ..................................................................
    // Get all
    app.get('/api/outputs', function(req, res){
      findAll(res, Output);
    });

    // Get one
    app.get('/api/outputs/:target_id', function(req, res){
      findOne(req,res, Output);
    });

    // Create new Output
    app.post('/api/outputs', function(req, res){
      Output.create({
        tag     : req.body.tag,
        format  : req.body.format,
        number  : req.body.number,
        size    : req.body.size
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Output);
      });
    });

    // Delete the specified element
    app.delete('/api/outputs/:target_id/delete', function(req,res) {
      deleteOne(req,res,Output);
    });

    // Deliverable .............................................................
    // Get all
    app.get('/api/deliverables', function(req, res){
      findAll(res, Deliverable);
    });

    // Get one
    app.get('/api/deliverables/:target_id', function(req, res){
      findOne(req,res, Deliverable);
    });

    // Create new Deliverable
    app.post('/api/deliverables', function(req, res){
      Deliverable.create({
        name            : req.body.name,
        date            : req.body.date,
        description     : req.body.description,
        risks           : req.body.risks,
        dependency      : req.body.dependency,
        requirements    : req.body.requirements,
        softdev         : req.body.softdev,
        datatransfer    : req.body.datatransfer,
        collabs         : req.body.collabs,
        virtualization  : req.body.virtualization,
        devenv          : req.body.devenv,
        hpcRessource    : req.body.hpcRessource,
        cloudRessource  : req.body.cloudRessource,
        hpc             : req.body.hpc,
        cloud           : req.body.cloud,
        hardware        : req.body.hardware,
        hr              : req.body.hr
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Deliverable);
      });
    });

    // Delete the specified element
    app.delete('/api/deliverables/:target_id/delete', function(req,res) {
      deleteOne(req,res,Deliverable);
    });

    // Software Development ....................................................
    // Get all
    app.get('/api/softdevs', function(req, res){
      findAll(res,SoftDev);
    });

    // Create new SoftDev
    app.post('/api/softdevs', function(req, res){
      SoftDev.create({
        name  : req.body.name,
        desc  : req.body.desc
      }, function(err,softdev){
        if (err)
          HandleError(err,res);
        findAll(res,SoftDev);
      });
    });

    // Delete the specified element
    app.delete('/api/softdevs/:target_id/delete', function(req,res) {
      deleteOne(req,res,SoftDev);
    });

    // Data Transfer ...........................................................
    // Get all
    app.get('/api/datatransfers', function(req, res){
      findAll(res,DataTransfer);
    });

    // Create new DataTransfer
    app.post('/api/datatransfers', function(req, res){
      DataTransfer.create({
        name  : req.body.name,
        desc  : req.body.desc
      }, function(err,datatransfer){
        if (err)
          HandleError(err,res);
        findAll(res,DataTransfer);
      });
    });

    // Delete the specified element
    app.delete('/api/datatransfers/:target_id/delete', function(req,res) {
      deleteOne(req,res,DataTransfer);
    });

    // Collab ..................................................................
    // Get all
    app.get('/api/collabs', function(req, res){
      findAll(res, Collab);
    });

    // Get one
    app.get('/api/collabs/:target_id', function(req, res){
      findOne(req,res, Collab);
    });

    // Create new Collab
    app.post('/api/collabs', function(req, res){
      Collab.create({
        id      : req.body.id,
        created : req.body.created,
        edited  : req.body.edited,
        title   : req.body.title,
        content : req.body.content,
        private : req.body.private,
        deleted : req.body.deleted
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Collab);
      });
    });

    // Delete the specified element
    app.delete('/api/deliverables/:target_id/delete', function(req,res) {
      deleteOne(req,res,Collab);
    });

    // Virtualization ..........................................................
    // Get all
    app.get('/api/virtualizations', function(req, res){
      findAll(res, Virtualization);
    });

    // Create new Virtualization
    app.post('/api/virtualizations', function(req, res){
      Virtualization.create({
        name  : req.body.name,
        desc  : req.body.desc
      }, function(err,virtualization){
        if (err)
          HandleError(err,res);
        findAll(res, Virtualization);
      });
    });

    // Delete the specified element
    app.delete('/api/virtualizations/:target_id/delete', function(req,res) {
      deleteOne(res, Virtualization);
    });

    // Development Environment .................................................
    // Get all
    app.get('/api/devenvs', function(req, res){
      findAll(res, DevEnv);
    });

    // Create new DevEnv
    app.post('/api/devenvs', function(req, res){
      DevEnv.create({
        name  : req.body.name,
        desc  : req.body.desc
      }, function(err,devenv){
        if (err)
          HandleError(err,res);
        findAll(res, DevEnv);
      });
    });

    // Delete the specified element
    app.delete('/api/devenvs/:target_id/delete', function(req,res) {
      deleteOne(res, DevEnv);
    });

    // HPC Ressources ..........................................................
    // Get all
    app.get('/api/hpcressources', function(req, res){
      findAll(res, Hpc);
    });

    // Get one
    app.get('/api/hpcressources/:target_id', function(req, res){
      findOne(req,res, Hpc);
    });

    // Create new HPC Ressource
    app.post('/api/hpcressources', function(req, res){
      Hpc.create({
        type : req.body.type,
        runs : req.body.runs,
        time : req.body.time,
        part : req.body.part,
        arte : req.body.arte,
        size : req.body.size
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Hpc);
      });
    });

    // Delete the specified element
    app.delete('/api/hpcressources/:target_id/delete', function(req,res) {
      deleteOne(req,res,Hpc);
    });

    // HPC Type ................................................................
    // Get all
    app.get('/api/hpctypes', function(req, res){
      findAll(res, HpcType);
    });

    // Create new HpcType
    app.post('/api/hpctypes', function(req, res){
      HpcType.create({
        name  : req.body.name,
        desc  : req.body.desc
      }, function(err,hpctype){
        if (err)
          HandleError(err,res);
        findAll(res, HpcType);
      });
    });

    // Delete the specified element
    app.delete('/api/hpctypes/:target_id/delete', function(req,res) {
      deleteOne(res, HpcType);
    });

    // Cloud Ressources ........................................................
    // Get all
    app.get('/api/cloudressources', function(req, res){
      findAll(res, Cloud);
    });

    // Get one
    app.get('/api/cloudressources/:target_id', function(req, res){
      findOne(req,res, Cloud);
    });

    // Create new Cloud Ressource
    app.post('/api/cloudressources', function(req, res){
      Cloud.create({
        type : req.body.type,
        runs : req.body.runs,
        time : req.body.time,
        part : req.body.part,
        arte : req.body.arte,
        size : req.body.size
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Cloud);
      });
    });

    // Delete the specified element
    app.delete('/api/cloudressources/:target_id/delete', function(req,res) {
      deleteOne(req,res,Cloud);
    });

    // Cloud Type ..............................................................
    // Get all
    app.get('/api/cloudtypes', function(req, res){
      findAll(res, CloudType);
    });

    // Create new CloudType
    app.post('/api/cloudtypes', function(req, res){
      CloudType.create({
        name  : req.body.name,
        desc  : req.body.desc
      }, function(err,cloudtype){
        if (err)
          HandleError(err,res);
        findAll(res, CloudType);
      });
    });

    // Delete the specified element
    app.delete('/api/cloudtypes/:target_id/delete', function(req,res) {
      deleteOne(res, CloudType);
    });

    // Hardware ................................................................
    // Get all
    app.get('/api/hardwares', function(req, res){
      findAll(res, Hardware);
    });

    // Get one
    app.get('/api/hardwares/:target_id', function(req, res){
      findOne(req,res, Hardware);
    });

    // Create new Hardware
    app.post('/api/hardwares', function(req, res){
      Hardware.create({
        name        : req.body.name,
        price       : req.body.price,
        link        : req.body.link,
        description : req.body.description
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, Hardware);
      });
    });

    // Delete the specified element
    app.delete('/api/hardwares/:target_id/delete', function(req,res) {
      deleteOne(req,res,Hardware);
    });

    // Human Ressources ........................................................
    // Get all
    app.get('/api/humanressources', function(req, res){
      findAll(res, HumanRessource);
    });

    // Get one
    app.get('/api/humanressources/:target_id', function(req, res){
      findOne(req,res, HumanRessource);
    });

    // Create new HumanRessource
    app.post('/api/humanressources', function(req, res){
      HumanRessource.create({
        name        : req.body.name,
        role        : req.body.role,
        pm          : req.body.pm,
        description : req.body.description
      }, function(err,project){
        if (err)
          HandleError(err,res);
        findAll(res, HumanRessource);
      });
    });

    // Delete the specified element
    app.delete('/api/humanressources/:target_id/delete', function(req,res) {
      deleteOne(req,res,HumanRessource);
    });

    // Role ....................................................................
    // Get all
    app.get('/api/roles', function(req, res){
      findAll(res, Role);
    });

    // Create new Role
    app.post('/api/roles', function(req, res){
      Role.create({
        name  : req.body.name
      }, function(err,role){
        if (err)
          HandleError(err,res);
        findAll(res, Role);
      });
    });

    // Delete the specified element
    app.delete('/api/roles/:target_id/delete', function(req,res) {
      delteOne(res, Role);
    });

    // General Review ..........................................................

    // Review ..................................................................

    // Comment .................................................................

    // Note ....................................................................

  // Application ---------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); //load the single view file
  })
// Listen ======================================================================
app.listen(8080);
console.log("App listening on port 8080.");
