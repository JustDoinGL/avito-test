import { Button, Slider } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setDate, setIsSearch, setSelectedContent, setSelectedGenres } from '../../redux/randomFilm/randomFilmSlice'
import styles from './RandomFilmPage.module.scss'
import TreeSelectContent from '../../ui/treeSelect/TreeSelect'
import { GenresArray, NameContentArray } from '../../helpers/const'
import { fetchRandomFilm } from '../../redux/randomFilm/getRandomFilm'
import { CardFilm } from '../../components/CardFilm/CardFilm'
import CardFilmSkeleton from '../../components/CardFilm/CardFilmSkeleton'
import { Status } from '../../redux/@types/enum'
import { useEffect } from 'react'

const RandomFilmPage = () => {
  const dispatch = useAppDispatch()
  const { value: theme } = useAppSelector((state) => state.theme)
  const { date, selectedContent, selectedGenres, film, isSearch, status } = useAppSelector((state) => state.randomFilm)

  useEffect(() => {
    if (!film && status === Status.fulfilled) {
      dispatch(
        fetchRandomFilm({
          date: [],
          selectedContent: [],
          selectedGenres: [],
        }),
      )
    }
  }, [film, dispatch, status])

  const onSliderChange = (value: number[]) => {
    dispatch(setDate(value))
  }

  const handleChangeGenres = (value: string[]) => {
    dispatch(setSelectedGenres(value))
  }

  const handleChangeCity = (value: string[]) => {
    dispatch(setSelectedContent(value))
  }

  const buttonClick = () => {
    dispatch(fetchRandomFilm({ selectedContent, selectedGenres, date }))
    dispatch(setIsSearch(false))
  }

  return (
    <div className={`container ${styles.container}`} data-testid='signup-page'>
      <div className={styles.film}>
        {isSearch && <h3 className='h3'>Мы не смогли найти по вашим запросам. Вот фильм на наше усмотрение</h3>}
        {film && status !== 'pending' ? <CardFilm film={film} /> : <CardFilmSkeleton />}
      </div>
      <div className={styles.select}>
        <TreeSelectContent
          content={GenresArray}
          multiple={true}
          placeholder='Выберите жанр'
          handleChange={handleChangeGenres}
          selectedValues={selectedGenres}
        />
        <TreeSelectContent
          content={NameContentArray}
          multiple={false}
          placeholder='Выберите производителя'
          handleChange={handleChangeCity}
          selectedValues={selectedContent}
        />
      </div>
      <div className={styles.slider}>
        <Slider
          style={{ maxWidth: 300, width: '100%' }}
          className={theme === 'dark' ? `${styles.dark}` : ''}
          range
          min={1900}
          max={2024}
          defaultValue={[1900, 2024]}
          onChange={onSliderChange}
          value={date}
        />
        <div>
          Выбранный промежуток: с {date[0]} до {date[1]}
        </div>
      </div>

      <div className={styles.button}>
        <Button style={{ width: 300 }} onClick={buttonClick}>
          Подобрать фильм
        </Button>
      </div>
    </div>
  )
}

export default RandomFilmPage
