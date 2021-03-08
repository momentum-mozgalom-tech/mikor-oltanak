import {
    Grid, Typography,
} from "@material-ui/core";
import styled from "styled-components/macro";
import * as React from "react";

export function InfoPage() {
    return (
        <Grid container spacing={5} direction="column" alignItems="center">
            <Grid item xs={12} md={6}>
                <Title variant="h2" align="center" gutterBottom>Gyakori kérdések</Title>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h6" paragraph>
                    Miért készítették ezt a weboldalt?
                </Typography>
                <Typography variant="body1" paragraph>
                    Abban a borzasztó járványhelyzetben, amiben ma vagyunk, minden kis segítség
                    számít. Háziorvosokkal beszélgetve azt vettük észre, hogy az aggódó páciensek
                    nagy számú telefonos érdeklődése is extra terhet jelent számukra, miközben
                    akár egy egyszerű weboldalon is ellenőrizhetnék a páciensek, hogy szerepelnek-e
                    a háziorvosuk oltási listáján. Reményeink szerint ugyan csak kicsit, de így is
                    könnyíthetünk az orvosaink munkáján.
                </Typography>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h6" paragraph>
                    Ki készítette ezt a weboldalt?
                </Typography>
                <Typography variant="body1" paragraph>
                    A Momentum Mozgalom közössége: egészségügyi szakértők, programozók és adatvédelmi
                    szakemberek kis csapata rakta össze a weblapot mindössze egy hétvége alatt.
                </Typography>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h6" paragraph>
                    Ez egy hivatalos állami weboldal?
                </Typography>
                <Typography variant="body1" paragraph>
                    Sajnos nem. Egy profi kormány esetében nem lenne szükség egy
                    ilyen lakossági kezdeményezésre, hiszen az elmúlt egy év és az állami
                    milliárdok elegendő felkészülési lehetőséget adtak a felkészülésre.
                    Ennek hiányában azonban úgy kell segítenünk, ahogy tudunk. Az önkéntesekből
                    álló csapatunk egy hétvége alatt, mindössze 3000 forintból készítette el
                    a weboldalt.
                </Typography>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h6">
                    Hogy segíthetek?
                </Typography>
                <Typography variant="body1">
                    <ul>
                        <li>Ajánlja a weboldalt háziorvosának!</li>
                        <li>
                            Ha programozó, akkor járuljon hozzá a weboldalhoz a
                            {" "}
                            <a href="https://github.com/momentum-mozgalom-tech/mikor-oltanak" target="_blank" rel="noopener noreferrer">githubon</a>
                            !
                        </li>
                        <li>
                            Csatlakozzon a tenni vágyó közösségünkhöz a
                            {" "}
                            <a href="https://jelentkezes.momentum.hu/" target="_blank" rel="noopener noreferrer">weblapunkon</a>
                            !
                        </li>
                    </ul>
                </Typography>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h6" paragraph>
                    A születési dátumok nem egyediek, így mi értelme van a weboldalnak?
                </Typography>
                <Typography variant="body1" paragraph>
                    Valóban, ha a páciens születési dátuma szerepel a háziorvosának listáján, akkor
                    még nem tudhatja biztosan, hogy tényleg ő szerepel-e azon a listán, és kénytelen
                    telefonálni. Ha viszont a páciens születési dátuma nem szerepel a listán, akkor
                    biztosra mondhatjuk, hogy felesleges telefonálnia. Így picit kevésbé hatékonyan,
                    de továbbra is tehermentesíthetjük az orvosokat.
                </Typography>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h6" paragraph>
                    Miért nem tajszámokat használnak a páciensek azonosításához?
                </Typography>
                <Typography variant="body1" paragraph>
                    A tajszám kiemelten érzékeny személyes adat, amit csak speciális, erre
                    jogosult intézmények kezelhetnek. Ezért adatvédelmi szakemberekkel
                    egyeztetve arra jutottunk, hogy az egyedi tajszámok helyett a nem egyedi
                    születési dátumokat használjuk.
                </Typography>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h6" paragraph>
                    Biztonságban vannak az adatok?
                </Typography>
                <Typography variant="body1" paragraph>
                    Igen. Egyrészt nem tárolunk semmilyen személyes adatot, csak születési dátumokat.
                    Másrészt a teljes adatbázis nem érhető el senkinek, csak a szükséges egyetlen egy
                    programozónak. Harmadrészt a keresések számát fejenként napi 10-ben limitáltuk,
                    így még a születési dátumok nagyobb mennyiségű exportja sem kivitelezhető.
                </Typography>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h6" paragraph>
                    Hol kérdezhetek a weblappal kapcsolatban?
                </Typography>
                <Typography variant="body1" paragraph>
                    Kérdéseit küldje az info@mikoroltanak.hu címre!
                </Typography>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h6" paragraph>
                    Attribúciók
                </Typography>
                <Typography variant="body1" paragraph>
                    <div>
                        A weblap ikonját a
                        {" "}
                        <a href="https://www.freepik.com" title="Freepik" target="_blank" rel="noopener noreferrer">Freepik</a>
                        {" "}
                        készítette a
                        {" "}
                        <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a>
                        {" "}
                        oldalon.
                    </div>
                </Typography>
            </Grid>
        </Grid>
    );
}

// Styles
const Title = styled(Typography)`
    ${({ theme }) => `
        ${theme.breakpoints.down("xs")} {
            font-size: 2rem;
        }
    `}
`;
