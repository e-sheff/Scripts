Left = 0;
Right = 0;
Top = 0;
Bottom = 0;

// åñëè ýòî íå ðåæèì ðåäàêòèðîâàíèÿ, òî óêàçûâàåì ãðàíèöû
if (!ParametricBlock)
{
    SetCamera(p3dFront);
    Left = GetEdge('Óêàæèòå ïåðâóþ âåðòèêàëüíóþ ãðàíèöó', AxisY).GFirst.x;
    Right = GetEdge('Óêàæèòå âòîðóþ âåðòèêàëüíóþ ãðàíèöó', AxisY).GFirst.x;
    Top = GetEdge('Óêàæèòå ïåðâóþ ãîðèçîíòàëüíóþ ãðàíèöó', AxisX).GFirst.y;
    Bottom = GetEdge('Óêàæèòå âòîðóþ ãîðèçîíòàëüíóþ ãðàíèöó', AxisX).GFirst.y;

    if (Left > Right) {
        aaa = Left
        Left = Right
        Right = aaa
    }
    if (Bottom > Top) {
        aaa = Bottom
        Bottom = Top
        Top = aaa
    }
}

MakeProp();

if (!ParametricBlock) {
    FileOptions = 'Save.xml';
    Action.Properties.Load(FileOptions);
    SzLeft.Value = Left;
    SzBottom.Value = Bottom;
    SzWidth.Value = Right - Left;
    SzHeight.Value = Top - Bottom;
    DepthVal.Value = 298;
}

BtnOK = NewButtonInput("Ïîñòðîèòü")
BtnOK.OnChange = function() {Action.Finish()};

function MakeProp() {
    Prop = Action.Properties;

    //ãðóïïà êîðïóñ
    Korp = Prop.NewGroup('Êîðïóñ');
    SzLeft = Korp.NewNumber('Ëåâî', Left);
    SzLeft.Visible = false;
    SzBottom = Korp.NewNumber('Íèç', Bottom);
    SzBottom.Visible = false;
    SzWidth = Korp.NewNumber('Øèðèíà', Right - Left);
    SzHeight = Korp.NewNumber('Âûñîòà', Top - Bottom);
    DepthVal = Korp.NewNumber('Ãëóáèíà');
    DepthVal.Value = 298;
    SideMat = Korp.NewMaterial('ÄÑÏ êîðïóñà');
    ButtC = Korp.NewButt('Êðîìêà êîðïóñà');

    //ãðóïïà âñòàâíàÿ ïîëêà
    PolkaVs = Prop.NewBool('Âñòàâíàÿ ïîëêà');
    PolkaVs.Value = true;
    PolkaVs.OnChange = function() {PolkaVs.ChildrenEnabled = PolkaVs.Value};
    CountPol = PolkaVs.NewNumber('Êîëè÷åñòâî');
    CountPol.Value = 1;
    ShelfOffset = PolkaVs.NewNumber('Îòñòóï ñ áîêîâ');
    ShelfOffset.Value = 1.5;
    ShelfZag = PolkaVs.NewNumber('Çàãëóáëåíèå');
    ShelfZag.Value = 22;

    //ãðóïïà ôàñàä
    Doors = Prop.NewCombo('Ôàñàäû', 'Ïàíåëü - Ïàíåëü\nÏàíåëü - Ðàìêà\nÐàìêà - Ïàíåëü\nÐàìêà - Ðàìêà');
    //VesFas = Doors.NewNumber('Âåñ ôàñàäîâ');
    //VesFas.Enabled = false;
    //VesFas.Value = SumFas;
    MatFas = Doors.NewMaterial('Ìàòåðèàë');
    ButtD = Doors.NewButt('Êðîìêà');
    KolDv = Doors.NewCombo('Êîë-âî äâåðåé',  '1\n2');
    PetliLeftRight = Doors.NewCombo('Ïåòëè', 'Ñëåâà\nÑïðàâà');

    //ãðóïïà ñòîëåøíèöà
    Stolesh = Prop.NewBool('Ñòîëåøíèöà');
    Stolesh.Value = true;
    Stolesh.OnChange = function() {Stolesh.ChildrenEnabled = Stolesh.Value};
    MatStol = Stolesh.NewMaterial('Ìàòåðèàë');

    // ãðóïïà ôóðíèòóðà
    FurnGroup = Prop.NewGroup('Ôóðíèòóðà');
    Ruch = FurnGroup.NewFurniture('Ðó÷êà');
    Angle = FurnGroup.NewCombo('Óãîë ïîâîðîòà ðó÷êè',  '0\n90')
    Îïîðà = FurnGroup.NewFurniture('Îïîðà');
    Pet = FurnGroup.NewFurniture('Ïåòëÿ');
    ÍàâåñêàËåâàÿ = FurnGroup.NewFurniture('Íàâåñêà Ëåâàÿ');
    ÍàâåñêàÏðàâàÿ = FurnGroup.NewFurniture('Íàâåñêà Ïðàâàÿ');
    Åâðîâèíò = FurnGroup.NewFurniture('Åâðîâèíò');
    Ïîëêîäåðæàòåëü = FurnGroup.NewFurniture('Ïîëêîäåðæàòåëü');
    Øêàíò = FurnGroup.NewFurniture('Øêàíò');

    //îáðàáîòêà íàæàòèÿ êíîêïè
    Btn = Prop.NewButton('Ïîñòðîèòü');
    Btn.OnClick = function() {
    Action.Finish()};
}

function Primenit()
{
    if (SzWidth.Value > 600)
    {
        PetliLeftRight.Enabled = false;
        KolDv.Enabled = false;
    }
    else
    {
        if (SzWidth.Value == 600)
        {
            KolDv.Enabled = true;
            if (KolDv.ItemIndex == 0)
                PetliLeftRight.Enabled = true;
            else
                PetliLeftRight.Enabled = false;
        }
        else
        {
            KolDv.Enabled = false;
            PetliLeftRight.Enabled = true;
        }
    }

    if (SzHeight.Value > 820)
    {
        ÍàâåñêàËåâàÿ.Enabled = true;
        ÍàâåñêàÏðàâàÿ.Enabled = true;
        Îïîðà.Enabled = false;
    } else {
        ÍàâåñêàËåâàÿ.Enabled = false;
        ÍàâåñêàÏðàâàÿ.Enabled = false;
        Îïîðà.Enabled = true;
    }

    if (Angle.ItemIndex == 0)
        Fi = 0;
    else
        Fi = 90;

    if (DepthVal.Value <= 199)
        alert('Ãëóáèíà êîïóñà ìåíåå 200 ìì!\nÂåäèòå çíà÷åíèå çàíîâî.')
    else
        MakeShelf();
}


Action.OnStart = function ()//îáðàáîòêà ñîáûòèé â ëþáûõ ïîëÿõ ââîäà ñâîéñòâà
{
    Prop.OnChange = Primenit;
    Primenit();
};


Action.Continue();

function EvrAndShkant(Panel1, Panel2, X, Y, Z, Sdvig) {
    Åâðîâèíò.Value.Mount(Panel1, Panel2, X, Y, Z);
    Øêàíò.Value.Mount(Panel1, Panel2, X, Y, Z + Sdvig);
}

function Petlya(Panel1, Panel2, X, Y, Z) {
    Pet.Value.Mount(Panel1, Panel2, X, Y, Z);
}

function Petli() {
    Petlya(Planka, DverUP, PetX3, Y1, Depth);
    Petlya(Planka, DverUP, Right - PetX3 + Left, Y1, Depth);
}

function Ruchka(Panel, X, Y, Z, S){
    Ruch.Value.Mount1(Panel, X, Y, Z, S)
}

function Dver1() //óñòàíîâêà îíîé äâåðè ñ ïåòëÿìè è ðó÷êîé
{
    MatFas.SetActive();
    DverUP = AddFrontPanel(Left + Fuga, CenrtY + Fuga, Right - Fuga, Top - Fuga, Depth);
    DverUP.TextureOrientation = ftoVertical; //íàïðàâëåíèå òåêñòóðû
    DverUP.AddButt(ButtD, 0);
    DverUP.AddButt(ButtD, 1);
    DverUP.AddButt(ButtD, 2);
    DverUP.AddButt(ButtD, 3);
    DverUP.Name = 'Äâåðü âåðõíÿÿ';
    DverX = DverUP.GSize.x / 1000;
    DverY = DverUP.GSize.y / 1000;
    DverZ = MatFas.Thickness / 1000;
    DverPlot = 700;
    DV = DverX * DverY * DverZ * DverPlot;
    DverVes = + DV.toPrecision(3);//âåñ äâåðè
    Petli();
}

function Dver2() //óñòàíîâêà äâóõ äâåðåé ñ ïåòëÿìè è ðó÷êàìè
{
    MatFas.SetActive()
    DverDN = AddFrontPanel(Left + Fuga, Bottom + Fuga, Right - Fuga, CenrtY - Fuga, Depth);
    DverDN.TextureOrientation = ftoVertical; //íàïðàâëåíèå òåêñòóðû
    DverDN.AddButt(ButtD, 0);
    DverDN.AddButt(ButtD, 1);
    DverDN.AddButt(ButtD, 2);
    DverDN.AddButt(ButtD, 3);
    DverDN.Name = 'Äâåðü íèæíÿÿ';
    Ruchka(DverDN, CentrX, Bottom + Fuga + 50, DepthDver, 0);
}

function Dver3()
{
    //BeginBlock("Ôàñàä ðàìî÷íûé");
    ProfGor = AddExtrusion();
    ProfGor.MaterialName = 'Ïðîôèëü ðàìî÷íûé óçêèé';
    ProfGor.MaterialWidth = 19;
    File = 'Óçêèé ïðîôèëü.frw';
    //ProfGor.Contour.Load(File);
    ProfGor.Thickness = SH - Fuga * 2;
    ProfGor.Orient(AxisX, AxisY)
    ProfGor.Position = NewVector(Left + Fuga, Bottom + Fuga, Depth);
    ProfGor.Name = 'Ïðîôèëü ãîðèçîíòàëüíûé';
    ProfGor.Clip(NewVector(0, 0, 0), NewVector(0, -1, 1));
    ProfGor.Clip(NewVector(0, 0, ProfGor.Thickness), NewVector(0, -1, -1));
    ProfGor.Build();
    ProfGor2 = AddSymmetry(ProfGor, NewVector(0, (Top - Bottom) * 0.25 + Bottom, 0),  AxisY);
    ProfGor2.Build();
    ProfVer = AddExtrusion();
    ProfVer.MaterialName = 'Ïðîôèëü ðàìî÷íûé óçêèé';
    ProfVer.MaterialWidth = 19;
    //ProfVer.Contour.Load(File);
    ProfVer.Orient(AxisY, Axis_X)
    ProfVer.Thickness = ((Top - Bottom) * 0.5 - (Fuga * 2));
    ProfVer.Position = NewVector(Right - Fuga, Fuga + Bottom, Depth);
    ProfVer.Name = 'Ïðôèëü âåðòèêàëüíûé';
    ProfVer.Clip(NewVector(0, 0, 0), NewVector(0, -1, 1));
    ProfVer.Clip(NewVector(0, 0, ProfVer.Thickness), NewVector(0, -1, -1));
    ProfVer.Build();
    ProfVer2 = AddSymmetry(ProfVer,  NewVector((Right - Left) * 0.5 + Left, 0, 0),  Axis_X);
    ProfVer2.Build();
    FrontPan = AddFrontPanel(Left + Fuga + 12, Bottom + Fuga + 12, Right - Fuga - 12, (CenrtY - Fuga) - 12, Depth + 14)
    FrontPan.Thickness = 4;
    FrontPan.MaterialName = 'Ñòåêëî 4 ìì';
    FrontPan.Name = 'Ñòåêëî äëÿ ðàìêè';
    FrontPan.TextureOrientation = TextureOrientation.Horizontal;
    FrontPan.Build();
    XS = FrontPan.GSize.x;
    YS = FrontPan.GSize.y;
    ZS = FrontPan.Thickness;
    VesST = (XS * YS * ZS / 1000000000 * 2500);
    VST = +VesST.toPrecision(3);
    LGor = ProfGor.Thickness * 2;
    LVer = ProfVer.Thickness * 2;
    VesR = (LGor + LVer) / 1000 * 0.3;
    VR = +VesR.toPrecision(3);
    VesFasRam = VST + VR;//âåñ ôàñàäà (ðàìêà + âñòàâêà)
}


function MakeShelf()
{
    DeleteNewObjects();

    // ãðàíèöû òåïåðü âîçüìåì èç ïàðàìåòðîâ (ò.ê. îíè ñîõðàíÿþòÿ)
    Left = SzLeft.Value;
    Bottom = SzBottom.Value;
    Right = SzLeft.Value + SzWidth.Value;
    Top = SzBottom.Value + SzHeight.Value;
    NameBL = 'Ïîëêà ';
    SH = Right - Left;
    SH1 = SH.toFixed().toString();
    BL = BeginParametricBlock(NameBL + SH1);

    Fuga = 2; //çàçîð äëÿ äâåðåé
    CentrX = (SH * 0.5 + Left);//îñü øêàôà ïî îñè Õ
    CenrtY = ((Top - Bottom ) * 0.5 + Bottom);//îñü øêàôà ïî îñè Ó
    Depth = DepthVal.Value;

    Offset = ShelfOffset.Value;
    SideMat.SetActive();
    DepthDver = Depth + SideMat.Thickness;
    LeftX = Left + SideMat.Thickness;
    RightX = Right - SideMat.Thickness;
    Y1 = Top - SideMat.Thickness;
    Y2 = Bottom + SideMat.Thickness;
    Z1 = 16;
    ActiveMaterial.Make('ÄÂÏ Ñåðàÿ', 4);
    Zadst = AddFrontPanel(LeftX - 5, Y1 + 5, RightX + 5, Y2 - 5, Z1); //óñòàíîâêà çàäíåé ñòåíêè
    Smech = Z1 + Zadst.Thickness;
    CZ = Zadst.Contour;
    SideMat.SetActive();

    //ðàñ÷åò ïîçèöèé ïåòåëü ïî îñè Õ
    PetX0 = SH - Fuga * 2;
    PetX1 = PetX0 - 200;
    PetX2 = PetX1 % 32;
    PetX3 = ((PetX0 - PetX1 + PetX2) * 0.5) + Left + Fuga;

    //Odds = SH.toFixed(); //øèðèíà êîðïóñà
    LeftPanel = AddVertPanel(0, Bottom, Depth, Top, Left); //óñòàíîâêà ëåâîãî áîêà
    RightPanel = AddVertPanel(0, Bottom, Depth, Top, RightX); //óñòàíîâêà ïðàâîãî áîêà
    Dno = AddHorizPanel(LeftX, 0, RightX, Depth, Bottom); // óñòàíîâêà äíà
    Planka = AddHorizPanel(LeftX, 0, RightX, Depth, Top - SideMat.Thickness); // óñòàíîâêà êðûøêè ñâåðõó

    PosY = Bottom;
    YInc = ((Top - Bottom) - SideMat.Thickness) / 2;
    ShLeft = LeftX + Offset; //çàçîð äëÿ âêàëäíîé ïîëêè ñëåâà
    ShRight = RightX - Offset; //çàçîð äëÿ âêàëäíîé ïîëêè ñïðàâà
    Prol = ((Y1 - Y2) - SideMat.Thickness * CountPol.Value) / (CountPol.Value + 1)

    //çàäàíèå òåêñòóð äëÿ ïàíåëåé
    LeftPanel.TextureOrientation = ftoVertical;
    RightPanel.TextureOrientation = ftoVertical;
    Dno.TextureOrientation = ftoHorizontal;
    Zadst.TextureOrientation = ftoVertical;
    Planka.TextureOrientation = ftoHorizontal;

    //ïàçû íà ïàíåëÿõ
    Cut1 = LeftPanel.AddCut('Ïàç 16 (4õ6)');
    Cut1.Trajectory.AddLine(18, 0, 18, LeftPanel.ContourHeight);
    Cut1.Contour.AddRectangle(-2, 0, 2, 6);
    Cut2 = RightPanel.AddCut('Ïàç 16 (4õ6)');
    Cut2.Trajectory.AddLine(18, 0, 18, RightPanel.ContourHeight);
    Cut2.Contour.AddRectangle(-2, RightPanel.Thickness, 2, RightPanel.Thickness - 6)
    Cut3 = Dno.AddCut('Ïàç 16 (4õ6)');
    Cut3.Trajectory.AddLine(0, -18, Dno.ContourWidth, -18);
    Cut3.Contour.AddRectangle(-2, Dno.Thickness - 6, 2, Dno.Thickness);
    Cut4 = Planka.AddCut('Ïàç 16 (4õ6)'); //ïàç
    Cut4.Trajectory.AddLine(0, -18, Planka.ContourWidth, -18);
    Cut4.Contour.AddRectangle(-2, 0, 2, 6);

    //êðîìêà íà ïàíåëÿõ
    LeftPanel.AddButt(ButtC, 0);
    LeftPanel.AddButt(ButtC, 1);
    LeftPanel.AddButt(ButtC, 2);
    LeftPanel.AddButt(ButtC, 3);
    RightPanel.AddButt(ButtC, 0);
    RightPanel.AddButt(ButtC, 1);
    RightPanel.AddButt(ButtC, 2);
    RightPanel.AddButt(ButtC, 3);
    Dno.AddButt(ButtC, 0);
    Dno.AddButt(ButtC, 2);
    Planka.AddButt(ButtC, 0);
    Planka.AddButt(ButtC, 2);

    //íàçâàíèÿ ïàíåëåé
    LeftPanel.Name = 'Áîê ëåâûé';
    RightPanel.Name = 'Áîê ïðàâûé';
    Zadst.Name = 'Çàäíÿÿ ñòåíêà';
    Planka.Name = 'Ïîëêà';
    Dno.Name = 'Ïîëêà';

    A1 = Depth - 37; //óñòàíîâêà ïåðâîãî åâðîâèíòà
    A2 = A1 % 32; //îñòàòîê îò ãëóáèíû êîðïóñà
    Zag = ShelfZag.Value; //çàãëóáëåíèå âñòàâíîé ïîëêè ñïåðåäè
    WidthPol = Depth - Smech - ShelfZag.Value;

    //óñòàíîâêà âñòàâíîé ïîëêè
    if (ShelfZag.Value < 0 || WidthPol <= 142) {
        alert('Çíà÷åíèå çàãëóáëåíèÿ ïîëêè íå êîððåêòíî!\nÂåäèòå çíà÷åíèå çàíîâî.')
    } else {
        if (PolkaVs.Value == true) {
            for (var k = 0; k < CountPol.Value; k++)
                if (ShelfOffset.Value < 0 || ShelfOffset.Value > 5) {
                    alert('Çíà÷åíèå îòñòóïà ïîëêè íå êîððåêòíî!\nÂâåäèòå çíà÷åíèå çàíîâî.')
                } else {
                    if (ShelfOffset.Value > 0) {
                        Y2 += Prol;
                        SideMat.SetActive();
                        Zpol = Depth - Zag;
                        Polka = AddHorizPanel(ShLeft, Smech, ShRight, Zpol, Y2);
                        ZPD1 = A2 + 64; //îòâ ïîä ïîëêîäåðæàòåëü ñçàäè
                        OstFase = (Zpol - ZPD1) % 32;
                        ZPD2 = Zpol - OstFase - 32
                        Polka.TextureOrientation = ftoHorizontal;
                        Polka.AddButt(ButtC, 0);
                        Polka.AddButt(ButtC, 1);
                        Polka.AddButt(ButtC, 2);
                        Polka.AddButt(ButtC, 3);
                        Polka.Name = 'Ïîëêà âñòàâíàÿ';
                        Polkoder = Ïîëêîäåðæàòåëü.Value;
                        Polkoder.Mount(Polka, LeftPanel, ShLeft, Y2, ZPD1);
                        Polkoder.Mount(Polka, RightPanel, ShRight, Y2, ZPD1);
                        Polkoder.Mount(Polka, LeftPanel, ShLeft, Y2, ZPD2);
                        Polkoder.Mount(Polka, RightPanel, ShRight, Y2, ZPD2);
                        Y2 += SideMat.Thickness;
                    } else {
                        Y2 += Prol;
                        SideMat.SetActive();
                        Zpol = Depth - Zag;
                        Polka = AddHorizPanel(ShLeft, Smech, ShRight, Zpol, Y2);
                        ZPD1 = A2 + 64; //îòâ ïîä ïîëêîäåðæàòåëü ñçàäè
                        OstFase = (Zpol - ZPD1) % 32;
                        ZPD2 = Zpol - OstFase - 32
                        Polka.TextureOrientation = ftoHorizontal;
                        Polka.AddButt(ButtC, 2);
                        Polka.Name = 'Ïîëêà';
                        EvrAndShkant(Polka, LeftPanel, LeftX, PosY, (A2 + 32), 32);
                        EvrAndShkant(Polka, RightPanel, RightX, PosY, (A2 + 32), 32);
                        EvrAndShkant(Polka, LeftPanel, LeftX, PosY, ZPD2, -32);
                        EvrAndShkant(Polka, RightPanel, RightX, PosY, ZPD2, -32);
                        Y2 += SideMat.Thickness;
                    }
                }
        }
    }

        CZ.Clear();
        CZ.AddLine(0, -Zadst.GSize.y, 0, -43);
        CZ.AddLine(0, -43, 16, -43);
        CZ.AddLine(16, -43, 16, 0);
        CZ.AddLine(16, 0, Zadst.GSize.x - 16, 0);
        CZ.AddLine(Zadst.GSize.x - 16, 0, Zadst.GSize.x - 16, -43);
        CZ.AddLine(Zadst.GSize.x - 16, -43, Zadst.GSize.x, -43);
        CZ.AddLine(Zadst.GSize.x, -43, Zadst.GSize.x, -Zadst.GSize.y);
        CZ.AddLine(Zadst.GSize.x, -Zadst.GSize.y, 0, -Zadst.GSize.y);

        EvrAndShkant(Dno, LeftPanel, LeftX, Y2, (A2 + 32), 32);
        EvrAndShkant(Dno, RightPanel, RightX, Y2, (A2 + 32), 32);
        EvrAndShkant(Dno, LeftPanel, LeftX, Y2, (Depth - 37), -32);
        EvrAndShkant(Dno, RightPanel, RightX, Y2, (Depth - 37), -32);
        EvrAndShkant(Planka, LeftPanel, LeftX, PosY, (A2 + 32), 32);
        EvrAndShkant(Planka, RightPanel, RightX, PosY, (A2 + 32), 32);
        EvrAndShkant(Planka, LeftPanel, LeftX, PosY, (Depth - 37), -32);
        EvrAndShkant(Planka, RightPanel, RightX, PosY, (Depth - 37), -32);
        NavesL = ÍàâåñêàËåâàÿ.Value;
        NavesL.Mount(Planka, LeftPanel, LeftX, Y1, Smech);
        NavesR = ÍàâåñêàÏðàâàÿ.Value;
        NavesR.Mount(Planka, RightPanel, RightX, Y1, Smech);

    Dver1();
    Dver3();
    BL = EndParametricBlock();
    SumFas = VesFasRam + DverVes;
    if (VesFas == undefined)
      VesFas = Doors.NewNumber('Âåñ ôàñàäîâ');
    VesFas.Value = SumFas;
    VesFas.Enabled = false;
    system.log(SumFas);

}
